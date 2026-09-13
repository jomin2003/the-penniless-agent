# Operating manual — running without any AI (from 2026-09-14)

Everything below runs on **GitHub Actions crons** (free on public repos). No AI session is
required for any of it. The system only emails you when a **60-second human action** is needed —
every email maps to exactly one such action. Nothing here involves your money.

## What runs by itself, forever

| Cron | Workflow | What it does unattended |
|---|---|---|
| every 30 min | `watcher` | Checks testnet wallet balances by public RPC, polls the Superteam agent API, scans paying repos for fresh unclaimed bugs ([SCOUT.md](SCOUT.md)), commits [STATUS.md](STATUS.md) |
| daily 06:23 UTC | `testnet` | Sends a transfer + (weekly) contract deployment on every funded testnet, commits [TESTNET.md](TESTNET.md), auto-refills Solana when the RPC allows |

Both workflows **fail on purpose** (= GitHub sends you an email) when something needs you.

## What each alarm email means → your 60-second action

1. **"Low gas / faucet action needed"** (from `testnet`) → open the faucet URL in the email,
   paste the wallet address (`0xA547B8AEb247c8885969FEf27285bAA5b0b1758A`), solve the captcha,
   click Claim. That's it. The address is testnet-only and worthless — safe to paste anywhere.
2. **"fresh unclaimed bounty candidate(s)"** (from `watcher`/scout) → a clean, unclaimed bug
   appeared in a repo that pays. Without an AI you can either fix it yourself, or ignore it —
   it will simply expire. (If you ever resubscribe to an AI, paste the SCOUT.md link and it
   can do the rest.)
3. **"Balance increased"** → money actually arrived in a wallet. Verify and decide next steps.

## Manual actions you may want (all optional, no AI needed)

- **Faucet top-ups for still-empty chains** (each 60 s, once ever needed): Kite AI, Fluent,
  Sei, Push Chain, Solana Devnet — URLs are listed in TESTNET.md's alarm lines and in the
  email alarms. Address to paste: `0xA547B8AEb247c8885969FEf27285bAA5b0b1758A`
  (Solana: `A1xi4pRRtZCtKqpZWREYGW8CDN43hMLdzD6t1D7q8qg6`).
- **Official Robinhood faucet** (0.01/day + stock tokens, Google sign-in):
  https://faucet.testnet.chain.robinhood.com — already claimed once today.
- **Superteam**: your agent identity `penniless-agent-jomin2003` exists; claim code for any
  future winnings is in your private credentials file.

## Keys & safety (read once)

- All testnet wallets are **testnet-only** and hold tokens with **zero monetary value**.
  Never send mainnet funds to them.
- Private keys live in two places only: your local
  `penniless-agent-credentials.txt` and encrypted GitHub secrets. Never in the repo.
- If a future airdrop ever credits a testnet wallet: import that wallet's key into your own
  wallet app (key is in the credentials file) before claiming anything.

## What still needs an AI (or your own hands)

- Actually **fixing bugs** the scout finds (coding work).
- Writing new bounty submissions.
- Everything else — balances, activity, discovery, alarms — is already autonomous.
