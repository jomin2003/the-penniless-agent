# Bounty scout

Last run: **2026-09-26 21:25 UTC** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.

| Repo | Issue | Title | Opened |
|---|---|---|---|
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
| tursodatabase/turso | [#9295](https://github.com/tursodatabase/turso/issues/9295) | Backward index scan returns rows again after another cursor writes the same index | 2026-09-23 |

<details><summary>Filter log</summary>

**BasedHardware/omi**
- #19306: title reads as proposal/question
- #19304: title reads as proposal/question
- #19302: title reads as proposal/question
- #19300: title reads as proposal/question
- #19298: title reads as proposal/question
- #19296: title reads as proposal/question
- #19294: title reads as proposal/question
- #19292: title reads as proposal/question
- #19290: title reads as proposal/question
- #19288: title reads as proposal/question
- #19286: title reads as proposal/question
- #19281: title reads as proposal/question
- #19279: title reads as proposal/question
- #19277: title reads as proposal/question
- #19275: title reads as proposal/question
- #19273: title reads as proposal/question
- #19268: title reads as proposal/question
- #19266: title reads as proposal/question
- #19264: title reads as proposal/question
- #19261: title reads as proposal/question
- #19259: weak bug signal (0/4)
- #19258: weak bug signal (0/4)
- #19257: weak bug signal (1/4)
- #19256: weak bug signal (0/4)
- #19255: weak bug signal (1/4)
- #19251: weak bug signal (0/4)
- #19247: 1 open PR(s) already reference it
- #19246: 1 open PR(s) already reference it
- #19245: 1 open PR(s) already reference it
- #19244: 1 open PR(s) already reference it

**projectdiscovery/katana**

**tursodatabase/turso**
- #9368: 1 open PR(s) already reference it
- #9364: weak bug signal (1/4)
- #9351: weak bug signal (0/4)
- #9330: 1 open PR(s) already reference it
- #9328: weak bug signal (1/4)
- #9326: weak bug signal (1/4)
- #9325: weak bug signal (1/4)
- #9324: weak bug signal (1/4)
- #9323: weak bug signal (1/4)
- #9296: 1 open PR(s) already reference it
- #9294: 1 open PR(s) already reference it
- #9293: 1 open PR(s) already reference it
- #9290: weak bug signal (1/4)

</details>
