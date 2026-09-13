// The Penniless Agent — testnet activity engine
// Keeps the dedicated testnet wallet active on candidate networks (free faucets only,
// zero mainnet funds). Testnet participation is the classic zero-capital rail: real
// on-chain activity today, speculative rewards at some future snapshot.
//
// Wallet: dedicated TESTNET-ONLY EVM key (GitHub secret TESTNET_EVM_KEY). Never hold
// mainnet funds here. Chain #1: Robinhood Chain testnet (Arbitrum Orbit, EVM, live mainnet).
//
// Daily routine: one native transfer to a derived buddy address, plus one minimal
// contract-creation transaction weekly. Logs to TESTNET.md; state in watcher/.testnet-state.json.

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Wallet, JsonRpcProvider, Transaction } from 'ethers';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEY = process.env.TESTNET_EVM_KEY;
if (!KEY) { console.log('TESTNET_EVM_KEY not set — skipping'); process.exit(0); }

const CHAINS = [
  {
    name: 'Robinhood Chain Testnet',
    rpc: 'https://rpc.testnet.chain.robinhood.com',
    chainId: 46630,
    minBalance: 0.0005, // keep a gas floor; faucet drip is 0.01/day
    tip: 0.00001,       // per-transfer amount
  },
];

const statePath = join(ROOT, 'watcher', '.testnet-state.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};

const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
const today = now.slice(0, 10);
const log = [`## ${now}`, ''];

for (const c of CHAINS) {
  const logLines = [`### ${c.name}`, ''];
  try {
    const provider = new JsonRpcProvider(c.rpc, c.chainId, { staticNetwork: true });
    const wallet = new Wallet(KEY, provider);
    const netId = (await provider.getNetwork()).chainId;
    if (Number(netId) !== c.chainId) throw new Error(`chainId mismatch: ${netId}`);
    const bal = await provider.getBalance(wallet.address);
    const balEth = Number(bal) / 1e18;
    logLines.push(`- wallet \`${wallet.address}\` balance: **${balEth.toFixed(6)} ETH**`);
    state[c.name] = { ...(state[c.name] || {}), buddy: state[c.name]?.buddy, lastRun: now, lastBalance: balEth };

    if (state[c.name]?.lastTransferDay === today) {
      logLines.push(`- already active today (${state[c.name].lastTransferDay}) — one entry per day.`);
      logLines.push('');
      log.push(...logLines);
      continue;
    }
    if (balEth < c.minBalance + c.tip) {
      logLines.push(`- skipped: balance below floor (${c.minBalance}). Claim the faucet, then rerun.`);
      logLines.push('');
      log.push(...logLines);
      continue;
    }

    const buddy = state[c.name]?.buddy || Wallet.createRandom().address;
    // 1) native transfer
    const tx1 = await wallet.sendTransaction({ to: buddy, value: BigInt(Math.round(c.tip * 1e18)) });
    const r1 = await tx1.wait();
    logLines.push(`- transfer ${c.tip} ETH → \`${buddy}\`: tx \`${tx1.hash}\` (block ${r1.blockNumber}, status ${r1.status})`);

    // 2) weekly contract-creation transaction (minimal init code; succeeds with empty runtime)
    const week = Math.floor(Date.now() / (7 * 86400 * 1000));
    if (state[c.name]?.lastDeployWeek !== week) {
      const tx2 = await wallet.sendTransaction({ data: '0x600160015500' });
      const r2 = await tx2.wait();
      logLines.push(`- contract creation: tx \`${tx2.hash}\` (block ${r2.blockNumber}, status ${r2.status}, contract ${r2.contractAddress})`);
      state[c.name] = { ...(state[c.name] || {}), lastDeployWeek: week, buddy };
    }
    state[c.name] = { ...(state[c.name] || {}), buddy, lastRun: now, lastBalance: balEth, lastTransferDay: today };
    logLines.push('');
    log.push(...logLines);
  } catch (e) {
    log.push(`### ${c.name}`, '', `- ERROR: ${e.message.slice(0, 200)}`, '');
  }
}

// rebuild TESTNET.md: header + today's entry + up to 19 previous entries
const header = '# Testnet activity log\n\nAutomated daily participation on free testnets (dedicated testnet-only wallet, faucet-funded, zero mainnet value).\n';
const tmPath = join(ROOT, 'TESTNET.md');
let oldEntries = '';
if (existsSync(tmPath)) {
  const txt = readFileSync(tmPath, 'utf8');
  const idx = txt.indexOf('\n## ');
  oldEntries = idx === -1 ? '' : txt.slice(idx + 1);
}
const merged = (log.join('\n') + (oldEntries ? '\n' + oldEntries : '')).split('\n## ').filter(s => s.trim());
const entries = merged.map(s => (s.startsWith('## ') ? s : '## ' + s)).join('\n');
writeFileSync(tmPath, header + '\n' + entries + '\n');
writeFileSync(statePath, JSON.stringify(state, null, 2));
console.log(log.join('\n'));
