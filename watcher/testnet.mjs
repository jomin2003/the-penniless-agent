// The Penniless Agent — multi-chain testnet activity engine
// Zero-capital rail: keeps dedicated testnet-only wallets active across candidate
// networks via free faucets. Runs unattended on GitHub Actions (no AI, no human).
// Chains: any EVM (config below) + Solana devnet (faucet has an open API → auto-refill).
//
// Secrets: TESTNET_EVM_KEY (one EVM key shared across testnets), TESTNET_SOL_KEY (base58).
// Alarms: .gas-alarm file → workflow fails loudly → operator email = "60-second manual faucet claim".

import { writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Wallet, JsonRpcProvider } from 'ethers';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const EVM_KEY = process.env.TESTNET_EVM_KEY;
const SOL_KEY = process.env.TESTNET_SOL_KEY;
const today = new Date().toISOString().slice(0, 10);
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

// Only networks whose RPC was verified live are listed. Faucet = where the operator
// tops up manually (60 s) when the low-gas alarm fires.
const EVM_CHAINS = [
  { name: 'Robinhood Chain Testnet', rpc: 'https://rpc.testnet.chain.robinhood.com', chainId: 46630, minBalance: 0.0005, tip: 0.00001, faucet: 'https://faucet.testnet.chain.robinhood.com (Google sign-in) or https://faucet.zalalena.com/robinhood' },
  { name: '0G Galileo Testnet', rpc: 'https://evmrpc-testnet.0g.ai', chainId: 16602, minBalance: 0.0002, tip: 0.000005, faucet: 'https://faucet.zalalena.com/0g-galileo' },
  { name: 'Kite AI Testnet', rpc: 'https://rpc-testnet.gokite.ai', chainId: 2368, minBalance: 0.0002, tip: 0.000005, faucet: 'https://faucet.zalalena.com/kiteai' },
  { name: 'Fluent Testnet', rpc: 'https://rpc.testnet.fluent.xyz', chainId: 20994, minBalance: 0.0002, tip: 0.000005, faucet: 'https://faucet.zalalena.com/fluent' },
  { name: 'Sei Atlantic-2 EVM', rpc: 'https://evm-rpc-testnet.sei-apis.com', chainId: 1328, minBalance: 0.0002, tip: 0.000005, faucet: 'https://faucet.zalalena.com/sei' },
  { name: 'Push Chain Testnet', rpc: 'https://evm.rpc-testnet-donut-node1.push.org', chainId: 42069, minBalance: 0.0002, tip: 0.000005, faucet: 'Push Chain official testnet faucet (see push.org docs)' },
];

const statePath = join(ROOT, 'watcher', '.testnet-state.json');
const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};
const log = [`## ${now}`, ''];
const alarms = [];

async function runEvm(c) {
  const lines = [`### ${c.name}`, ''];
  const provider = new JsonRpcProvider(c.rpc, c.chainId, { staticNetwork: true });
  const wallet = new Wallet(EVM_KEY, provider);
  const netId = Number((await provider.getNetwork()).chainId);
  if (netId !== c.chainId) throw new Error(`chainId mismatch: ${netId}`);
  const balEth = Number(await provider.getBalance(wallet.address)) / 1e18;
  lines.push(`- wallet \`${wallet.address}\` balance: **${balEth.toFixed(6)} ETH**`);
  state[c.name] = { ...(state[c.name] || {}), lastRun: now, lastBalance: balEth };

  if (state[c.name]?.lastTransferDay === today) {
    lines.push(`- already active today.`);
    lines.push('');
    log.push(...lines);
    return;
  }
  if (balEth < c.minBalance + c.tip) {
    lines.push(`- ⛽ LOW GAS — needs a 60-second faucet claim: ${c.faucet}`);
    lines.push('');
    alarms.push(`${c.name} (balance ${balEth.toFixed(6)}) → ${c.faucet}`);
    log.push(...lines);
    return;
  }

  const buddy = state[c.name]?.buddy || Wallet.createRandom().address;
  const tx = await wallet.sendTransaction({ to: buddy, value: BigInt(Math.round(c.tip * 1e18)) });
  const r = await tx.wait();
  lines.push(`- transfer ${c.tip} ETH → \`${buddy}\`: tx \`${tx.hash}\` (block ${r.blockNumber}, status ${r.status})`);

  const week = Math.floor(Date.now() / (7 * 86400 * 1000));
  if (state[c.name]?.lastDeployWeek !== week) {
    const tx2 = await wallet.sendTransaction({ data: '0x600160015500' });
    const r2 = await tx2.wait();
    lines.push(`- contract creation: tx \`${tx2.hash}\` (block ${r2.blockNumber}, status ${r2.status}, contract ${r2.contractAddress})`);
    state[c.name].lastDeployWeek = week;
  }
  state[c.name] = { ...state[c.name], buddy, lastTransferDay: today };
  lines.push('');
  log.push(...lines);
}

async function runSolana() {
  const name = 'Solana Devnet';
  const lines = [`### ${name}`, ''];
  try {
    const { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction: SolTx, sendAndConfirmTransaction } = await import('@solana/web3.js');
    const bs58mod = await import('bs58');
    const bs58 = bs58mod.default ?? bs58mod;
    const kp = Keypair.fromSecretKey(bs58.decode(SOL_KEY));
    const conn = new Connection('https://api.devnet.solana.com', 'confirmed');
    let bal = await conn.getBalance(kp.publicKey) / LAMPORTS_PER_SOL;
    lines.push(`- wallet \`${kp.publicKey.toBase58()}\` balance: **${bal.toFixed(6)} SOL**`);
    state[name] = { ...(state[name] || {}), lastRun: now, lastBalance: bal };

    // best-effort auto-refill (devnet airdrops are rate-limited per IP; from Actions this
    // often fails — that is fine while the balance still covers transfers)
    if (bal < 0.02) {
      try {
        const sig = await conn.requestAirdrop(kp.publicKey, 100_000_000); // 0.1 SOL
        const latest = await conn.getLatestBlockhash();
        await conn.confirmTransaction({ signature: sig, ...latest }, 'confirmed');
        lines.push(`- auto-refill: 0.1 SOL airdropped (sig \`${sig.slice(0, 20)}…\`)`);
        bal = await conn.getBalance(kp.publicKey) / LAMPORTS_PER_SOL;
        lines.push(`- balance after refill: **${bal.toFixed(6)} SOL**`);
      } catch (e) {
        lines.push(`- auto-refill unavailable (rate-limited) — still fine while balance covers transfers`);
      }
    }
    if (state[name]?.lastTransferDay === today) {
      lines.push(`- already active today.`);
    } else if (bal < 0.000006) {
      lines.push(`- ⛽ OUT OF GAS — needs a 60-second faucet claim: https://faucet.solana.com or https://solana-faucet.zalalena.com`);
      alarms.push(`Solana Devnet out of gas → https://faucet.solana.com or https://solana-faucet.zalalena.com`);
    } else {
      const buddy = state[name]?.buddy || Keypair.generate().publicKey.toBase58();
      const tx = new SolTx().add(SystemProgram.transfer({
        fromPubkey: kp.publicKey, toPubkey: buddy, lamports: 5000,
      }));
      const sig = await sendAndConfirmTransaction(conn, tx, [kp]);
      lines.push(`- transfer 0.000005 SOL → \`${buddy}\`: sig \`${sig}\``);
      state[name] = { ...state[name], buddy, lastTransferDay: today };
    }
  } catch (e) {
    lines.push(`- ERROR: ${e.message.slice(0, 200)}`);
    alarms.push(`Solana Devnet: ${e.message.slice(0, 120)}`);
  }
  lines.push('');
  log.push(...lines);
}

if (EVM_KEY) {
  for (const c of EVM_CHAINS) {
    try { await runEvm(c); }
    catch (e) { log.push(`### ${c.name}`, '', `- ERROR: ${e.message.slice(0, 200)}`, ''); }
  }
} else {
  log.push('### EVM chains', '', '- TESTNET_EVM_KEY not set — skipped', '');
}
if (SOL_KEY) await runSolana();
else log.push('### Solana Devnet', '', '- TESTNET_SOL_KEY not set — skipped', '');

// rebuild TESTNET.md: header + today + up to 19 previous entries
const header = '# Testnet activity log\n\nAutomated daily participation on free testnets (dedicated testnet-only wallets, faucet-funded, zero mainnet value). Runs unattended on GitHub Actions — no AI, no human, no money.\n';
const tmPath = join(ROOT, 'TESTNET.md');
let oldEntries = '';
if (existsSync(tmPath)) {
  const txt = readFileSync(tmPath, 'utf8');
  const idx = txt.indexOf('\n## ');
  oldEntries = idx === -1 ? '' : txt.slice(idx + 1);
}
const merged = (log.join('\n') + (oldEntries ? '\n' + oldEntries : '')).split('\n## ').filter(s => s.trim());
const entries = merged.map(s => (s.startsWith('## ') ? s : '## ' + s)).slice(0, 20).join('\n');
writeFileSync(tmPath, header + '\n' + entries + '\n');
writeFileSync(statePath, JSON.stringify(state, null, 2));

if (alarms.length) {
  writeFileSync(join(ROOT, '.gas-alarm'), 'Low gas / faucet action needed: ' + alarms.join(' | '));
} else {
  rmSync(join(ROOT, '.gas-alarm'), { force: true });
}
console.log(log.join('\n'));
if (alarms.length) console.log('*** GAS ALARM: ' + alarms.join(' | '));
