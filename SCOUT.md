# Bounty scout

Last run: **2026-11-28 11:29 UTC** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.

| Repo | Issue | Title | Opened |
|---|---|---|---|
| tursodatabase/turso | [#12656](https://github.com/tursodatabase/turso/issues/12656) | MVCC: a Busy INSERT into an attached database leaves its transaction open, so DETACH fails and other writers get Busy | 2026-11-28 |
| tursodatabase/turso | [#12655](https://github.com/tursodatabase/turso/issues/12655) | PRAGMA journal_mode = 'mvcc' is not safe while another connection runs statements: it panics, and the database can fail to open | 2026-11-28 |
| tursodatabase/turso | [#12654](https://github.com/tursodatabase/turso/issues/12654) | Two interleaved ATTACH ... AS aux statements on one connection panic with "namespace name already exists" | 2026-11-28 |
| tursodatabase/turso | [#12652](https://github.com/tursodatabase/turso/issues/12652) | PRAGMA journal_mode writes the new mode to page 1 without a sync or the write lock, so a power loss or another connection leaves a database that does not open | 2026-11-28 |
| tursodatabase/turso | [#12651](https://github.com/tursodatabase/turso/issues/12651) | A failed write of page 1 on a new database sends later commits only to the WAL, and a crash then loses them all | 2026-11-28 |
| tursodatabase/turso | [#12648](https://github.com/tursodatabase/turso/issues/12648) | MVCC: a new connection takes a WAL read mark without the checkpoint gate, so a blocking checkpoint fails with Busy after it starts | 2026-11-28 |
| tursodatabase/turso | [#12647](https://github.com/tursodatabase/turso/issues/12647) | core: four bugs on main: short file on async I/O, failed MVCC restore reload, MVCC-to-WAL switch, dropped MVCC statements | 2026-11-28 |
| tursodatabase/turso | [#12628](https://github.com/tursodatabase/turso/issues/12628) | differential fuzzer ddl failure seed 7116562677037991430 | 2026-11-27 |
| tursodatabase/turso | [#12620](https://github.com/tursodatabase/turso/issues/12620) | MVCC: opening a cursor scans the whole root map (O(tables + indexes) per cursor open) | 2026-11-27 |
| tursodatabase/turso | [#12615](https://github.com/tursodatabase/turso/issues/12615) | Code smell: Multiprocess WAL: reopen after a crash returns a commit with damaged WAL frames | 2026-11-27 |

<details><summary>Filter log</summary>

**BasedHardware/omi**
- #26597: weak bug signal (1/4)
- #26590: weak bug signal (1/4)
- #26589: weak bug signal (1/4)
- #26586: weak bug signal (1/4)
- #26584: weak bug signal (1/4)
- #26578: weak bug signal (1/4)
- #26577: weak bug signal (1/4)
- #26571: weak bug signal (1/4)
- #26557: title reads as proposal/question
- #26556: weak bug signal (1/4)
- #26551: weak bug signal (1/4)
- #26536: weak bug signal (1/4)
- #26534: title reads as proposal/question
- #26533: weak bug signal (1/4)
- #26532: weak bug signal (1/4)
- #26531: weak bug signal (1/4)
- #26528: weak bug signal (1/4)
- #26525: weak bug signal (1/4)
- #26523: weak bug signal (1/4)
- #26522: weak bug signal (0/4)
- #26520: weak bug signal (1/4)
- #26514: weak bug signal (0/4)
- #26513: weak bug signal (0/4)
- #26510: weak bug signal (0/4)
- #26508: weak bug signal (0/4)
- #26502: weak bug signal (0/4)
- #26500: weak bug signal (0/4)
- #26498: weak bug signal (0/4)
- #26489: weak bug signal (0/4)
- #26486: weak bug signal (1/4)

**projectdiscovery/katana**

**tursodatabase/turso**
- #12646: weak bug signal (1/4)
- #12642: weak bug signal (1/4)
- #12641: weak bug signal (1/4)
- #12637: weak bug signal (1/4)
- #12636: weak bug signal (1/4)
- #12629: weak bug signal (0/4)
- #12623: 1 open PR(s) already reference it
- #12600: weak bug signal (0/4)
- #12599: 1 open PR(s) already reference it
- #12598: weak bug signal (0/4)
- #12596: weak bug signal (1/4)
- #12595: weak bug signal (1/4)
- #12594: weak bug signal (1/4)
- #12584: weak bug signal (1/4)
- #12583: weak bug signal (1/4)
- #12579: weak bug signal (1/4)
- #12578: weak bug signal (0/4)
- #12570: weak bug signal (1/4)
- #12564: weak bug signal (1/4)
- #12563: weak bug signal (1/4)

</details>
