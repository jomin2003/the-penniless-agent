# Bounty scout

Last run: **2026-10-30 08:21 UTC** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.

| Repo | Issue | Title | Opened |
|---|---|---|---|
| BasedHardware/omi | [#23940](https://github.com/BasedHardware/omi/issues/23940) | bug(firmware): CV1 OTA update from 3.0.18 to 3.0.21 fails at 0% install | 2026-10-29 |
| tursodatabase/turso | [#11065](https://github.com/tursodatabase/turso/issues/11065) | Partial index WHERE rejects deterministic date/time functions like date(a) | 2026-10-30 |
| tursodatabase/turso | [#11063](https://github.com/tursodatabase/turso/issues/11063) | CREATE INDEX term validation uses generic messages and a different error order… | 2026-10-30 |
| tursodatabase/turso | [#11062](https://github.com/tursodatabase/turso/issues/11062) | Code smell: INSERT OR FAIL keeps rows after errors that should roll back the whole statement | 2026-10-30 |
| tursodatabase/turso | [#11061](https://github.com/tursodatabase/turso/issues/11061) | A STRICT type-mismatch error uses the statement's OR FAIL resolution and keeps… | 2026-10-30 |
| tursodatabase/turso | [#11060](https://github.com/tursodatabase/turso/issues/11060) | tursopg: non-integer constant in ORDER BY is accepted | 2026-10-30 |
| tursodatabase/turso | [#11059](https://github.com/tursodatabase/turso/issues/11059) | Code smell: Integer PRAGMAs reject quoted values and parse numbers differently from SQLite | 2026-10-30 |
| tursodatabase/turso | [#11054](https://github.com/tursodatabase/turso/issues/11054) | Code smell: tursopg guesses SQLSTATE codes by searching error messages, which contain table names | 2026-10-30 |
| tursodatabase/turso | [#11053](https://github.com/tursodatabase/turso/issues/11053) | duplicate column errors never map to 42701 duplicate_column | 2026-10-30 |
| tursodatabase/turso | [#11052](https://github.com/tursodatabase/turso/issues/11052) | parse_error_sqlstate in postgres/frontend/error.rs classifies by substring… | 2026-10-30 |
| tursodatabase/turso | [#11051](https://github.com/tursodatabase/turso/issues/11051) | printf %c drops a NUL first character instead of writing it | 2026-10-30 |
| tursodatabase/turso | [#11050](https://github.com/tursodatabase/turso/issues/11050) | Code smell: tursopg runs PostgreSQL regexes as Rust regexes and returns NULL on errors | 2026-10-30 |
| tursodatabase/turso | [#11049](https://github.com/tursodatabase/turso/issues/11049) | Regex operators lowered to REGEXP return NULL for an invalid regex instead of… | 2026-10-30 |
| tursodatabase/turso | [#11048](https://github.com/tursodatabase/turso/issues/11048) | REGEXP returns NULL for regexes the Rust engine rejects | 2026-10-30 |
| tursodatabase/turso | [#11040](https://github.com/tursodatabase/turso/issues/11040) | In the SQLite frontend, an inline column UNIQUE constraint name is dropped… | 2026-10-29 |
| tursodatabase/turso | [#11039](https://github.com/tursodatabase/turso/issues/11039) | op_rename_table drops the declared spelling of the new table name | 2026-10-29 |
| tursodatabase/turso | [#11035](https://github.com/tursodatabase/turso/issues/11035) | Code smell: A failed statement in a transaction keeps its rolled-back table in the in-memory schema | 2026-10-29 |
| tursodatabase/turso | [#11033](https://github.com/tursodatabase/turso/issues/11033) | tursopg: chr(0) is accepted instead of failing with 54000 | 2026-10-29 |
| tursodatabase/turso | [#11030](https://github.com/tursodatabase/turso/issues/11030) | INSERT ... VALUES with fewer values than the table has columns | 2026-10-29 |
| tursodatabase/turso | [#11029](https://github.com/tursodatabase/turso/issues/11029) | The PostgreSQL frontend does not type-check DEFAULT expressions against the… | 2026-10-29 |

<details><summary>Filter log</summary>

**BasedHardware/omi**
- #24074: weak bug signal (1/4)
- #24055: weak bug signal (0/4)
- #23923: weak bug signal (1/4)
- #23905: weak bug signal (1/4)
- #23840: 2 open PR(s) already reference it
- #23761: 2 open PR(s) already reference it

**projectdiscovery/katana**
- #1953: weak bug signal (0/4)
- #1946: weak bug signal (1/4)
- #1942: weak bug signal (0/4)

**tursodatabase/turso**
- #11067: weak bug signal (1/4)
- #11064: weak bug signal (1/4)
- #11057: weak bug signal (1/4)
- #11056: weak bug signal (1/4)
- #11046: weak bug signal (0/4)
- #11041: weak bug signal (1/4)
- #11034: weak bug signal (1/4)
- #11028: weak bug signal (0/4)
- #11025: weak bug signal (1/4)
- #11024: weak bug signal (1/4)
- #11022: weak bug signal (1/4)

</details>
