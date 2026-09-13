// The Penniless Agent — bounty scout
// Zero-capital earning radar. Polls proven-paying repos for FRESH, UNCLAIMED,
// objectively-fixable bug reports, filtering the two failure modes documented in
// FIELD-STUDY.md: free-work honeypots and agent-saturated races.
//
// Repo admission requires payment evidence (merged bounty-paid PRs, real org history).
// An issue qualifies only if: opened recently, no open PR references it, no patch is
// already attached, and it reads like a reproducible bug (objective work).
// Output: SCOUT.md + .scout-alarm (consumed by the GitHub Action → email).

import { writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_SCOUT_TOKEN || '';
const H = TOKEN ? { authorization: `token ${TOKEN}`, 'user-agent': 'penniless-scout' } : { 'user-agent': 'penniless-scout' };

// Admission list — every repo here has verifiable payout history:
//  BasedHardware/omi: contribution guide with paid-bounty program, 76+ merged bounty PRs (checked 2026-09-13)
//  projectdiscovery/katana: Algora award on record (issue #1367, paid)
//  tursodatabase/turso: Algora challenge paid $2,500+ to 7 contributors (closed program, spot-check only)
const WATCH = [
  { repo: 'BasedHardware/omi', minStars: 5000, langs: ['python'] },
  { repo: 'projectdiscovery/katana', minStars: 2000, langs: ['go'] },
];

const BUG_SIGNALS = [
  /traceback|stack ?trace|exception|panic|segfault/i,
  /error[: ]|fails?|crash(es|ed)?|incorrect|wrong|ignores?|drops?|leaks?|duplicat/i,
  /reproduc\w*|steps to (re)?produce|minimal (example|repro)/i,
  /version|commit \w{7,}|at main|regression/i,
];
const SPAM_SIGNALS = [
  /\$9{3,}/, /urgent/i, /earn (money|crypto)/i, /whatsapp|telegram channel/i,
  /\b(upvote|subscribe|like and)\b/i,
];
const NON_BUG_TITLES = /proposal|question|inquiry|for hire|feature|rfc|discussion|idea|roadmap|bounty/i;

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers: H });
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') throw new Error('GitHub rate limit hit');
  if (!res.ok) throw new Error(`GET ${path} → HTTP ${res.status}`);
  return res.json();
}

async function repoAdmitted(repo, minStars) {
  const meta = await gh(`/repos/${repo}`);
  if (meta.stargazers_count < minStars) return { ok: false, why: `stars ${meta.stargazers_count} < ${minStars}` };
  if (meta.archived) return { ok: false, why: 'archived' };
  return { ok: true, meta };
}

async function openPrsReferencing(repo, issueNumber) {
  const q = encodeURIComponent(`repo:${repo} type:pr state:open ${issueNumber}`);
  const j = await gh(`/search/issues?q=${q}&per_page=5`);
  return j.total_count ?? 0;
}

async function scanRepo({ repo, minStars }) {
  const out = { repo, candidates: [], skipped: [] };
  const admission = await repoAdmitted(repo, minStars);
  if (!admission.ok) { out.skipped.push(`repo gate: ${admission.why}`); return out; }

  const since = new Date(Date.now() - 72 * 3600 * 1000).toISOString().slice(0, 10);
  const q = encodeURIComponent(`repo:${repo} type:issue state:open created:>=${since}`);
  const j = await gh(`/search/issues?q=${q}&sort=created&order=desc&per_page=30`);
  for (const issue of j.items ?? []) {
    if (issue.pull_request) continue;
    const body = issue.body || '';
    const title = issue.title || '';
    const why = [];
    if (NON_BUG_TITLES.test(title)) why.push('title reads as proposal/question');
    if (SPAM_SIGNALS.some(rx => rx.test(title)) || SPAM_SIGNALS.some(rx => rx.test(body.slice(0, 500)))) why.push('spam pattern');
    const bugScore = BUG_SIGNALS.reduce((n, rx) => n + (rx.test(`${title}\n${body}`) ? 1 : 0), 0);
    if (bugScore < 2) why.push(`weak bug signal (${bugScore}/4)`);
    if (body.length < 300) why.push('thin body (no reproduction detail)');
    if (/```diff/.test(body)) why.push('patch already attached');
    if (why.length === 0) {
      const prs = await openPrsReferencing(repo, issue.number);
      if (prs > 0) why.push(`${prs} open PR(s) already reference it`);
      else out.candidates.push({ number: issue.number, title, url: issue.html_url, created: issue.created_at, labels: (issue.labels||[]).map(l=>l.name) });
    }
    if (why.length) out.skipped.push(`#${issue.number}: ${why[0]}`);
  }
  return out;
}

const results = [];
for (const w of WATCH) {
  try { results.push(await scanRepo(w)); }
  catch (e) { results.push({ repo: w.repo, candidates: [], skipped: [e.message] }); }
}

const fresh = results.flatMap(r => r.candidates.map(c => ({ ...c, repo: r.repo })));
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';

const statePath = join(ROOT, 'watcher', '.scout-state.json');
const prev = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : { seen: {} };
const seen = prev.seen || {};
const key = c => `${c.repo}#${c.number}`;
const newOnes = fresh.filter(c => !seen[key(c)]);

const lines = [
  '# Bounty scout', '',
  `Last run: **${now}** — fresh (≤72h), unclaimed, reproducible bugs on repos with verifiable payout history.`, '',
  '| Repo | Issue | Title | Opened |',
  '|---|---|---|---|',
  ...(fresh.length ? fresh.map(c => `| ${c.repo} | [#${c.number}](${c.url}) | ${c.title.replace(/\|/g, '/')} | ${c.created.slice(0, 10)} |`) : ['| — | — | nothing clean right now | — |']),
  '', '<details><summary>Filter log</summary>', '',
  ...results.flatMap(r => [`**${r.repo}**`, ...r.skipped.map(s => `- ${s}`), '']),
  '</details>', '',
];
writeFileSync(join(ROOT, 'SCOUT.md'), lines.join('\n'));

// Alarm only on candidates never seen before — no repeat noise while a known one sits unclaimed.
// A stale committed alarm (from a prior run) must not re-trigger: clear it unless there is a NEW one.
if (newOnes.length) {
  writeFileSync(join(ROOT, '.scout-alarm'),
    `${newOnes.length} NEW unclaimed bounty candidate(s): ` +
    newOnes.map(c => `${c.repo}#${c.number}`).join(', '));
} else {
  rmSync(join(ROOT, '.scout-alarm'), { force: true });
}
for (const c of fresh) seen[key(c)] = c.created;
writeFileSync(statePath, JSON.stringify({ seen, updatedAt: now }, null, 2));
console.log(lines.join('\n'));
if (newOnes.length) console.log('*** SCOUT: NEW candidates — alarm written ***');
