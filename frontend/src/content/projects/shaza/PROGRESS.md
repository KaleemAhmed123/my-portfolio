# Shaza case study — progress

Route: `/work/shaza/:tab` · Content: `./index.js`
Source: `Desktop/Project-Details-Playbook/Shaza/` — the **interview half (parts 1–76)**,
not just the portfolio summary (77–79). The summary alone was ~25% of the material
and produced the shallow first draft.
Code: `Desktop/forever-yours` (package name `shaza`)

The Sanity card is still titled **Forever Yours**. The content file matches on both
names, so the card resolves to `/work/shaza` either way.

## Depth pass — done 2026-08-19

Rewritten from ~5,100 words to **15,211**, matching the Eudoro standard
(11,589 across 15 tabs). Tab structure unchanged; every tab deepened in place.

## Second pass — Heartbeat + AI + legal, 2026-08-19

Now **21,480 words across 19 tabs**. Two new tabs, and the AI tab roughly tripled.
Source for this pass was the **codebase**, not the playbooks: `moodConstants.js`,
`CycleTracking.js`, `cycleAwareContext.js`, `moodAnalytics.js` and the repo's own
`HEARTBEAT_RESEARCH_V2.md` all carry material no playbook records.

| Tab | Words | Note |
|---|---:|---|
| **Heartbeat** (new, Product) | 2557 | taxonomy reasoning, 5 capture modes, needs tags, empathy streak, full cycle/wellness, Attunement, nudge policy |
| **Privacy & Legal** (new, Engineering) | 1564 | clinical boundary, 3 consents, retention, and the E2EE-vs-server-side-AI conflict as the centrepiece |
| Companion & Memory | 929 → 2757 | added the 6-layer priority stack, fact-check protocol, anti-sycophancy, context budget, staleness, injection-via-import |
| Challenges | 780 → 1005 | added the socialBattery dead-branch story |
| Debt & Next | 707 → 806 | added the encryption card |

## Current state — all 19 tabs

| # | Tab | Group | Words | Status |
|---|-----|-------|------:|--------|
| 1 | Overview | Product | 409 | done |
| 2 | Problem | Product | 938 | 6-row problem table, mediation-vs-normal-chat table, 3 leak paths, India constraint |
| 3 | Product Idea | Product | 1000 | the permission-graph matrix, persona-as-measurement |
| 4 | Features | Product | 754 | 4 verified tables incl. Not built rows; Heartbeat rows now defer to tab 5 |
| 5 | **Heartbeat** | Product | 2557 | **new** |
| 6 | My Role | Product | 571 | research loop + all 7 rejections |
| 7 | Try It | Product | 213 | done |
| 8 | Architecture | Engineering | 1255 | **diagram debt** |
| 9 | AI Pipelines | Engineering | 729 | **diagram debt** |
| 10 | Companion & Memory | Engineering | 2757 | tripled in second pass |
| 11 | Mediation | Engineering | 2140 | strongest engineering tab |
| 12 | Safety | Engineering | 1024 | 5 layers, coverage matrix |
| 13 | Evaluation | Engineering | 1139 | 2 gates, what it does NOT cover |
| 14 | Challenges | Engineering | 1005 | leads with the stream-parser story |
| 15 | Security | Engineering | 838 | structural-vs-convention table |
| 16 | **Privacy & Legal** | Engineering | 1564 | **new** |
| 17 | Infra | Engineering | 689 | 3 deployment weaknesses named |
| 18 | Debt & Next | Engineering | 806 | encryption card added |
| 19 | Learnings | Engineering | 1092 | 12 cards + what I'd keep / reorder |

Verified: `node check.mjs` passes, `vite build` exits 0, **0 em dashes**,
19 tabs, no duplicate ids, **21,480 words**.

## Corrected in the second pass

- **Fixed a live bug in the Shaza repo.** `cycleAwareContext.js` branched on
  `socialBattery === "drained" | "charged"`; the real enum is
  `need_space | neutral | want_company`. Those two strings are sub-moods of
  `tired`/`energized`, so two of the five `buildMoodDerivedContext` insights
  could never fire. `tests/userCurrentMoodContext.test.js` had passed
  `socialBattery: "drained"` and `needsTags: ["comfort_food"]` — both invalid —
  because it mocks the model, so the schema never rejected them. Fixed the
  branches, corrected the fixtures, added 4 regression tests including one that
  asserts every branch value is a member of the exported enum. 22 non-Mongo
  suites / 222 tests green. (The 6 failing suites in a full run are
  `mongodb-memory-server` failing to start locally, pre-existing.)
- **Found and fixed a Terms/config retention mismatch.** Terms §5 promised
  breakup purge after **30 days**; `COUPLE_BREAKUP_GRACE_PERIOD_DAYS` defaults to
  **90**, which is what the system actually did. Decision was that 90 is correct,
  so **Terms §5 was corrected to 90** in the Shaza repo. The Privacy & Legal tab
  tells it as a found-and-fixed story rather than open debt. Retention now has
  **three places that must change together**: `appConfig`, `app/terms` §5, and
  `app/privacy` §6, documented in both the privacy page header and the mood
  context doc.
- **Drafted `frontend/app/privacy/page.tsx`** in the Shaza repo. Written against
  code behaviour, with a header comment flagging the retention mismatch and the
  unfilled grievance-officer placeholders. Not lawyer-reviewed.

## Corrected in the first pass

- **The stream-parser bug is fixed and is no longer published as open debt.**
  Playbook Part 33.4 records it fixed 2026-08-18 (`da402c9`) with a 12-case
  regression test. It was **three** bugs sharing one root shape, and bug 2 is the
  better story: `[SPLIT]` never split anything, so every multi-bubble coach reply
  had been collapsing into one bubble for the feature's entire life with no error
  anywhere. Moved from Debt & Next to Challenges, where it now leads.

## Open items

- [ ] **Diagrams.** Nothing exported yet. The AI pipeline diagram is still the
      highest-value one on either project — four pipelines over three shared
      components is the whole architecture in one picture. Architecture and
      AI Pipelines both carry `diagramDebt: true`.
- [ ] **Screenshots.** None. The Heartbeat privacy model (partner view vs own
      view) is very hard to explain in prose and trivial to show side by side.
- [ ] **Clips.** Eudoro has two flow clips in `public/clips/`. Shaza has none.
      A mediation flow clip would carry the map-reduce story better than the
      ASCII diagram does.
- [ ] Fill the grievance officer placeholders in `app/privacy/page.tsx` and get a
      legal review. Deliberately deferred: the product is pre-launch, and the
      placeholders are flagged in the file header. Blocking on first real user.
- [ ] Credentials key is `Forever Yours`, matching the Sanity credentials doc. If
      that doc gets renamed to Shaza, update `credentialsKey` in `index.js`.

## Sources not yet mined

`SHAZA-ISSUE-TRACKER.md` (34 KB) still unread. Playbook parts 41–46 (cost,
latency, degradation, watch-together, real-time, database) and 57–66 (cross-feature
context, invariants, observability) were skimmed rather than mined; there is more
depth available for Infra and the Companion tab if wanted.

## Deliberately not here

- AI-as-dev-tool disclosure. Product AI (companion, mediation, safety) is a feature
  and stays; how the code was written is interview-only, per the build spec.
- A Trade-offs tab. Removed on the Eudoro pass and not reintroduced; the honest
  limits live inside the tab they belong to instead.
