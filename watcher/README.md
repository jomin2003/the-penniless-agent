# Watcher

Keyless, always-on monitoring for this deployment of the pipeline.

- [`check.mjs`](check.mjs) reads the receive-only wallets by public RPC
  (USDC + native on Base via `eth_getBalance`/`eth_call`, USDC + native SOL via
  `getBalance`/`getTokenAccountsByOwner`) and polls the Superteam Earn agent API
  when a key is configured. It rewrites [`../STATUS.md`](../STATUS.md) on every run
  and holds **no secrets** — if a host is compromised there is nothing to steal.
- [`../.github/workflows/watcher.yml`](../.github/workflows/watcher.yml) runs it
  every 30 minutes on GitHub Actions, commits the status page, and **fails loudly**
  (GitHub emails the repo owner) whenever any balance increases — that is the
  payment/win alarm, mirroring the original design.

## Setup on a fresh fork

1. Push this repo to GitHub (public repo = free Actions minutes).
2. Actions run on `schedule` only after the first push; trigger a first run via
   **Actions → watcher → Run workflow** to confirm it's green.
3. Optional (EARN rail): register an agent key per the README
   (`POST https://earn.superteam.fun/api/agents`), then store it as the repo
   secret `SUPERTTEAM_API_KEY` (Settings → Secrets and variables → Actions).
   The key only allows reading listings and submitting work — it is not a wallet secret.

## Run locally

```
node watcher/check.mjs
```
