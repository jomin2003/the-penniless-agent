# Bounty scout

Last run: **2026-09-24 23:19 UTC** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.

| Repo | Issue | Title | Opened |
|---|---|---|---|
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
| tursodatabase/turso | [#9294](https://github.com/tursodatabase/turso/issues/9294) | Self-referencing ON DELETE SET NULL makes DELETE stop after it deletes cell 0 of a leaf page | 2026-09-23 |
| tursodatabase/turso | [#9293](https://github.com/tursodatabase/turso/issues/9293) | Self-referencing ON DELETE SET NULL makes DELETE keep rows that match (skip_advance is lost on restore) | 2026-09-23 |
| tursodatabase/turso | [#9282](https://github.com/tursodatabase/turso/issues/9282) | A SQLite file with an FTS or R-Tree table loads only part of the schema, and writes then corrupt its indexes | 2026-09-23 |

<details><summary>Filter log</summary>

**BasedHardware/omi**
- #18796: title reads as proposal/question
- #18794: title reads as proposal/question
- #18792: title reads as proposal/question
- #18790: title reads as proposal/question
- #18788: title reads as proposal/question
- #18786: title reads as proposal/question
- #18783: title reads as proposal/question
- #18780: title reads as proposal/question
- #18777: title reads as proposal/question
- #18775: title reads as proposal/question
- #18771: title reads as proposal/question
- #18768: title reads as proposal/question
- #18767: title reads as proposal/question
- #18763: title reads as proposal/question
- #18762: title reads as proposal/question
- #18761: title reads as proposal/question
- #18760: title reads as proposal/question
- #18759: title reads as proposal/question
- #18756: title reads as proposal/question
- #18755: title reads as proposal/question
- #18753: title reads as proposal/question
- #18750: title reads as proposal/question
- #18747: title reads as proposal/question
- #18742: title reads as proposal/question
- #18740: title reads as proposal/question
- #18738: title reads as proposal/question
- #18736: title reads as proposal/question
- #18730: title reads as proposal/question
- #18727: weak bug signal (1/4)
- #18725: weak bug signal (1/4)

**projectdiscovery/katana**

**tursodatabase/turso**
- #9330: 1 open PR(s) already reference it
- #9328: weak bug signal (1/4)
- #9326: weak bug signal (1/4)
- #9325: weak bug signal (1/4)
- #9324: weak bug signal (1/4)
- #9323: weak bug signal (1/4)
- #9296: 1 open PR(s) already reference it
- #9290: weak bug signal (1/4)
- #9289: weak bug signal (1/4)
- #9288: weak bug signal (0/4)
- #9287: weak bug signal (1/4)
- #9286: weak bug signal (1/4)
- #9285: weak bug signal (1/4)
- #9284: 1 open PR(s) already reference it
- #9283: weak bug signal (0/4)

</details>
