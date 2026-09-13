# Bounty plan: zero-capital earning strategy (updated 2026-09-13)

**Status after a full sweep:** no open, funded, unclaimed code bounty existed for a zero-capital
agent on sweep day. Details and receipts in [LOG.md](LOG.md) (2026-09-13 entry). The standing
answer is the **scout**: `watcher/scout.mjs` runs every 30 minutes on the Actions cron, scans
repos with verifiable payout histories for fresh (≤72h), unclaimed, reproducible bugs, filters
honeypots and agent races automatically, and emails the operator (Action failure) the moment a
clean target appears. When it fires: dispatch the agent, arrive first, fix impeccably, request
the bounty per the target repo's guide, verify merge AND payment separately — merged ≠ paid.

---

# (Archived) Steve Agent Arena — the one open agent-eligible bounty

Found 2026-09-13 via the live public feed (`superteam.fun/api/listings`). This is the **only**
listing out of 23 open ones with `agentAccess: AGENT_ALLOWED`; the other 22 are HUMAN_ONLY
(videos, merch design, in-person pitches). The agent-API `/live` feed served stale, already-judged
rounds — do not submit into those; the public feed is the source of truth.

- Listing: https://superteam.fun/listings/steve-agent-arena-launch-your-agent-and-win-500-usdc
- Reward: 500 USDC total — 1st: 250, 2nd: 150, 3rd: 100 (USDC on Solana, paid to your wallet)
- Sponsor: OOBE Protocol (Steve, steve.oobeprotocol.ai) — real product, 17 submissions so far
- Closes: **2026-09-19 23:59 UTC** · winners 2026-09-27 · join any time in the window
- Judging: strategy/trading quality 35%, creative use 30%, arena activity 20%, content 15%.
  **Positive PnL not required.** Small disciplined trades beat XP farming.

## What only the human can do (3 gates — ~15 min + funds)

1. **Sign in at https://steve.oobeprotocol.ai with Google or X** — OAuth in the browser; the agent
   wallet is created non-custodial at onboarding (keys stay in your browser). Set handle, name, avatar.
   Suggested handle: `penniless-agent` (or whatever is free).
2. **Connect your X account and publish one post** (draft below) tagging @SteveTheAgentAI and @OOBEonSol.
3. **Fund the Steve agent wallet with ≥50 USDC + ~1 SOL for fees** — the minimum is 5 qualifying
   Jupiter swaps of ≥10 USDC each, verified on-chain. No deposit = no qualifying trades = no entry.
   Your existing Solana wallet (`E6gv...u9E`) is empty; this needs fresh funds, that is the capital
   gate the field study warned about. Deposit only what you can afford to leave in the arena.

## What the agent does once you've signed in and funded

- Runs the 5+ qualifying swaps through the Steve agent (Jupiter ≥10 USDC) with a written risk policy:
  stable-to-stable / SOL pairs, small size, no leverage, no wash loops (explicitly disqualified).
- Completes Arena missions for bonus XP: SAP registry (+250), MagicBlock private swap (+75),
  product feedback (+125), social/creator missions.
- Gathers proof links: transaction signatures, mission receipts, XP position.
- Files the submission through Superteam Earn (agent API or the form) and **reads it back to verify
  it persisted** — a 201 is not a delivered message.

## X post draft (edit the brackets, then post)

> Launched my Steve agent on @solana: an onchain operator wired into OOBE's SAP MCP catalog —
> 390+ tools across Jupiter, Adrena, MagicBlock, Pyth. I built it to [run small, disciplined
> Jupiter swaps with a fixed risk policy: position caps, no leverage, walk away when signals
> are weak]. Workflows I used: [market data → risk check → simulated tx → signed execution,
> journaled on-chain]. Strategy: [tiny stable↔SOL swaps, 5+ qualifying trades, no XP farming —
> quality over churn]. What I learned: [your real result — e.g. first agent-executed trade,
> receipt: <tx link>]. Screenshots in thread. @SteveTheAgentAI @OOBEonSol

## Submission text draft (after requirements are met)

- Steve handle: [your handle]
- X post: [link]
- Strategy: penniless-agent deployment of the safe-agent-commerce playbook: minimum viable
  capital, written risk policy before every trade, deterministic stable↔SOL swaps, bonus
  missions (SAP registry, MagicBlock private swap, product feedback) for depth. Positive PnL
  not required; discipline and verifiable receipts are the edge.

## Honest odds

1 prize among ~17+ entrants with 2 weeks left; judging rewards quality over volume. Cost of
entry: ≥50 USDC + fees at risk in trading. Positive PnL is not required to win, but capital
can still lose value in the arena. Decide with that arithmetic in view (skill rule 4).
