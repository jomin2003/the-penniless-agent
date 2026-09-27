# Bounty scout

Last run: **2026-09-27 19:11 UTC** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.

| Repo | Issue | Title | Opened |
|---|---|---|---|
| tursodatabase/turso | [#9383](https://github.com/tursodatabase/turso/issues/9383) | FTS: DROP TABLE leaves an orphaned backing-index page, confirmed by SQLite (0.7.2) | 2026-09-27 |
| tursodatabase/turso | [#9381](https://github.com/tursodatabase/turso/issues/9381) | limbo_sim: unbounded skip loop grows the plan until OOM when a property is skipped and the next interaction needs an exclusive tx (MVCC) | 2026-09-27 |
| tursodatabase/turso | [#9377](https://github.com/tursodatabase/turso/issues/9377) | Concurrent calls on a prepared statement can overwrite bound parameters | 2026-09-27 |
| tursodatabase/turso | [#9376](https://github.com/tursodatabase/turso/issues/9376) | Sync pull updates an identical row and trips an append-only trigger | 2026-09-26 |
| tursodatabase/turso | [#9375](https://github.com/tursodatabase/turso/issues/9375) | bindings/go: processes loading the embedded library at the same time fail with "cached library file hash sum mismatch" | 2026-09-26 |
| tursodatabase/turso | [#9362](https://github.com/tursodatabase/turso/issues/9362) | multiprocess_wal: a process opening without the flag is not rejected, and its committed writes are lost | 2026-09-25 |
| tursodatabase/turso | [#9347](https://github.com/tursodatabase/turso/issues/9347) | Planner improvement: recognize literal false as 0 when matching partial-index predicates | 2026-09-25 |
| tursodatabase/turso | [#9346](https://github.com/tursodatabase/turso/issues/9346) | Planner chooses quadratic join order for ROW_NUMBER CTE (5.4s vs SQLite 5ms) | 2026-09-25 |
| tursodatabase/turso | [#9345](https://github.com/tursodatabase/turso/issues/9345) | Bound parameter matching a partial-index predicate causes a full scan unlike SQLite | 2026-09-25 |
| tursodatabase/turso | [#9340](https://github.com/tursodatabase/turso/issues/9340) | `wal_insert_begin` on a closed connection returns `Ok` and takes the write lock | 2026-09-24 |
| tursodatabase/turso | [#9339](https://github.com/tursodatabase/turso/issues/9339) | `wal_insert_frame` does not validate the frame checksum, so a damaged frame gives wrong data | 2026-09-24 |
| tursodatabase/turso | [#9338](https://github.com/tursodatabase/turso/issues/9338) | `wal_get_frame` can write into the caller buffer after it returns an error | 2026-09-24 |
| tursodatabase/turso | [#9337](https://github.com/tursodatabase/turso/issues/9337) | `wal_insert_end(false)` does not fsync commit frames that readers already see | 2026-09-24 |
| tursodatabase/turso | [#9336](https://github.com/tursodatabase/turso/issues/9336) | Raw WAL API returns success with no frames on an MVCC database | 2026-09-24 |
| tursodatabase/turso | [#9335](https://github.com/tursodatabase/turso/issues/9335) | `wal_get_frame` returns uncommitted frames after the committed `max_frame` | 2026-09-24 |
| tursodatabase/turso | [#9334](https://github.com/tursodatabase/turso/issues/9334) | `wal_insert_frame` without `wal_insert_begin` overwrites committed frames of other connections | 2026-09-24 |
| tursodatabase/turso | [#9333](https://github.com/tursodatabase/turso/issues/9333) | `wal_insert_end` releases the write lock before its rollback, and a concurrent writer loses committed changes | 2026-09-24 |
| tursodatabase/turso | [#9329](https://github.com/tursodatabase/turso/issues/9329) | A write while a table scan waits for IO in a descent fails "save_position: table cursor with has_record=true must be on a leaf" | 2026-09-24 |
| tursodatabase/turso | [#9327](https://github.com/tursodatabase/turso/issues/9327) | MVCC: a SELECT that continues after COMMIT panics with "transaction should exist in txs map" | 2026-09-24 |
| tursodatabase/turso | [#9322](https://github.com/tursodatabase/turso/issues/9322) | DROP TABLE succeeds while a SELECT on the table is open, and the SELECT then returns rows of another table | 2026-09-24 |

<details><summary>Filter log</summary>

**BasedHardware/omi**
- #19478: title reads as proposal/question
- #19465: weak bug signal (1/4)
- #19463: title reads as proposal/question
- #19461: title reads as proposal/question
- #19459: 1 open PR(s) already reference it
- #19457: title reads as proposal/question
- #19454: title reads as proposal/question
- #19453: weak bug signal (1/4)
- #19449: 1 open PR(s) already reference it
- #19446: 1 open PR(s) already reference it
- #19443: title reads as proposal/question
- #19439: title reads as proposal/question
- #19435: title reads as proposal/question
- #19423: title reads as proposal/question
- #19413: title reads as proposal/question
- #19407: title reads as proposal/question
- #19405: title reads as proposal/question
- #19401: title reads as proposal/question
- #19393: title reads as proposal/question
- #19389: title reads as proposal/question
- #19377: title reads as proposal/question
- #19375: title reads as proposal/question
- #19371: title reads as proposal/question
- #19369: title reads as proposal/question
- #19366: title reads as proposal/question
- #19363: title reads as proposal/question
- #19360: title reads as proposal/question
- #19346: title reads as proposal/question
- #19341: title reads as proposal/question
- #19335: 1 open PR(s) already reference it

**projectdiscovery/katana**

**tursodatabase/turso**
- #9382: weak bug signal (1/4)
- #9368: 1 open PR(s) already reference it
- #9364: weak bug signal (1/4)
- #9351: weak bug signal (0/4)
- #9330: 1 open PR(s) already reference it
- #9328: weak bug signal (1/4)
- #9326: weak bug signal (1/4)
- #9325: weak bug signal (1/4)
- #9324: weak bug signal (1/4)
- #9323: weak bug signal (1/4)

</details>
