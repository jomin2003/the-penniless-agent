// The Penniless Agent — watcher
// Keyless checks of the receive-only wallets and earning rails. Holds no secrets:
// the wallet addresses below are public by design; every read is a public RPC call.
// Optional: SUPERTTEAM_API_KEY enables Superteam Earn live-listing discovery.
// Usage: node watcher/check.mjs   → rewrites STATUS.md, updates watcher/.state.json,
//                                  and writes .watcher-alarm if any balance increased.

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const WALLETS = {
  eth: '0x239eA4aEb7eeD25860c777dd63f149Aea27C4BF5',
  sol: 'E6gvz5DTDfNVxLUpHfwe6evezuG98kd1uWCnz8sF6u9E',
};
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const USDC_SOL_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const BASE_RPCS = ['https://mainnet.base.org', 'https://base-rpc.publicnode.com'];
const SOL_RPC = 'https://api.mainnet-beta.solana.com';

async function rpc(url, method, params) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`${method} → HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(`${method} → ${json.error.message}`);
  return json.result;
}

async function firstOk(urls, fn) {
  let lastErr;
  for (const url of urls) {
    try { return await fn(url); } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

const ethCallBalanceOf = (addr) =>
  '0x70a08231' + '0'.repeat(24) + addr.slice(2).toLowerCase();

async function checkEthereum() {
  return firstOk(BASE_RPCS, async (url) => {
    const wei = BigInt(await rpc(url, 'eth_getBalance', [WALLETS.eth, 'latest']));
    const usdcRaw = await rpc(url, 'eth_call', [
      { to: USDC_BASE, data: ethCallBalanceOf(WALLETS.eth) }, 'latest',
    ]);
    return {
      eth: Number(wei) / 1e18,
      usdc: Number(BigInt(usdcRaw)) / 1e6,
    };
  });
}

async function checkSolana() {
  const lamports = Number((await rpc(SOL_RPC, 'getBalance', [WALLETS.sol])).value);
  const tokens = await rpc(SOL_RPC, 'getTokenAccountsByOwner', [
    WALLETS.sol, { mint: USDC_SOL_MINT }, { encoding: 'jsonParsed' },
  ]);
  let usdc = 0;
  for (const acc of tokens.value) {
    usdc += acc.account.data.parsed.info.tokenAmount.uiAmount ?? 0;
  }
  return { sol: lamports / 1e9, usdc };
}

async function checkSuperteam() {
  const key = process.env.SUPERTTEAM_API_KEY;
  if (!key) return { configured: false };
  // Direct host: earn.superteam.fun 308-redirects here and fetch strips auth on cross-host redirects.
  const res = await fetch('https://superteam.fun/api/agents/listings/live', {
    headers: { authorization: `Bearer ${key}` },
  });
  if (!res.ok) return { configured: true, error: `HTTP ${res.status}` };
  const listings = await res.json();
  const count = Array.isArray(listings) ? listings.length : listings?.listings?.length ?? 0;
  return { configured: true, liveListings: count };
}

function fmt(n, d) { return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }

const statePath = join(ROOT, 'watcher', '.state.json');
const prev = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : null;

let eth = { eth: NaN, usdc: NaN }, sol = { sol: NaN, usdc: NaN }, superteam = { configured: false }, errors = [];
try { eth = await checkEthereum(); } catch (e) { errors.push(`Ethereum/Base: ${e.message}`); }
try { sol = await checkSolana(); } catch (e) { errors.push(`Solana: ${e.message}`); }
try { superteam = await checkSuperteam(); } catch (e) { errors.push(`Superteam: ${e.message}`); }

const totalUsdc = (eth.usdc || 0) + (sol.usdc || 0);
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

const lines = [
  '# Watcher status', '',
  `Last run: **${now}** — keyless public-RPC reads; the watcher holds no keys (see [watcher/](watcher/)).`, '',
  '## HOLD — receive-only wallets', '',
  '| Rail | Address | Balance |',
  '|---|---|---|',
  `| USDC on Base | \`${WALLETS.eth}\` | ${isNaN(eth.usdc) ? 'RPC error' : fmt(eth.usdc, 2) + ' USDC'} |`,
  `| ETH (native, Base) | \`${WALLETS.eth}\` | ${isNaN(eth.eth) ? 'RPC error' : eth.eth.toFixed(8) + ' ETH'} |`,
  `| USDC on Solana | \`${WALLETS.sol}\` | ${isNaN(sol.usdc) ? 'RPC error' : fmt(sol.usdc, 2) + ' USDC'} |`,
  `| SOL (native) | \`${WALLETS.sol}\` | ${isNaN(sol.sol) ? 'RPC error' : sol.sol.toFixed(8) + ' SOL'} |`,
  '', `**Stablecoin total: ${fmt(totalUsdc, 2)} USDC**`, '',
  '## EARN — rails', '',
  superteam.configured
    ? (superteam.error
        ? `- Superteam Earn agent API: configured, but listing poll failed (${superteam.error})`
        : `- Superteam Earn agent API: configured — **${superteam.liveListings} live listings** at last poll`)
    : '- Superteam Earn agent API: not configured yet (set the `SUPERTTEAM_API_KEY` secret; see [watcher/README.md](watcher/README.md))',
  '',
];
if (errors.length) {
  lines.push('## Errors', '');
  for (const e of errors) lines.push(`- ${e}`);
  lines.push('');
}

writeFileSync(join(ROOT, 'STATUS.md'), lines.join('\n'));

// Change detection → alarm file consumed by the GitHub Action (fail loudly = email).
const increased = prev && !isNaN(eth.usdc) && !isNaN(sol.usdc) && (
  totalUsdc > (prev.totalUsdc ?? 0) ||
  (sol.sol ?? 0) > (prev.sol ?? 0) ||
  (eth.eth ?? 0) > (prev.eth ?? 0)
);
if (increased) {
  writeFileSync(join(ROOT, '.watcher-alarm'),
    `Balance increased: ${fmt(prev.totalUsdc ?? 0, 2)} → ${fmt(totalUsdc, 2)} USDC`);
}
writeFileSync(statePath, JSON.stringify({
  totalUsdc, eth: eth.eth, sol: sol.sol, updatedAt: now,
}, null, 2));

console.log(lines.join('\n'));
if (increased) console.log('*** BALANCE INCREASED — alarm written ***');
