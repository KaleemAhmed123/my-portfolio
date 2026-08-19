# GAZA40+ case study — progress

Route: `/work/gaza40-student-portal/:tab` · Content: `./index.js`
Source: `Desktop/Project-Details-Playbook/Gaza40Plus/GAZA40-PLAYBOOK.md`
(9,141 lines / 588 KB, 72 parts: 1–60 interview, 61–64 portfolio, 65–72 audit
and fix ledger) plus `GAZA40-ISSUE-TRACKER.md` (1,386 lines, not yet mined).
Live at `portal.gaza40plus.co.uk`.

## The one thing to never get wrong

**This is not a solo project.** Built with Hamza, who led the overall
implementation. The author's work was mostly the backend, the module structure,
the services and workflows, and specifically the authorization model, plus
frontend scaffolding, UX and the product thinking. The role pill reads
"Backend & authorization" rather than anything implying sole ownership, and the
My Role tab opens on the collaboration and carries a "What I would not claim"
section. Hamza is credited 8 times across the page; there are zero
sole-authorship phrases. **Verify this survives any future edit.**

## Built 2026-08-19 — 21 tabs, 29,752 words

Product 5,356 · Engineering 24,396.

| # | Tab | Group | Words |
|---|-----|-------|------:|
| 1 | Overview | Product | 503 |
| 2 | Problem | Product | 1118 |
| 3 | What We Built | Product | 1656 |
| 4 | Features | Product | 1007 |
| 5 | My Role | Product | 761 |
| 6 | Try It | Product | 311 |
| 7 | Architecture | Engineering | 2152 |
| 8 | Roles & Access | Engineering | 2137 |
| 9 | Regional Isolation | Engineering | 2015 |
| 10 | Onboarding & Review | Engineering | 1340 |
| 11 | Queries & Escalation | Engineering | 1244 |
| 12 | The Offer Workflow | Engineering | 1788 |
| 13 | The Funding Engine | Engineering | 1328 |
| 14 | Document Security | Engineering | 2259 |
| 15 | Chat & Notifications | Engineering | 1559 |
| 16 | Security & Privacy | Engineering | 1950 |
| 17 | Data & Jobs | Engineering | 1825 |
| 18 | Frontend & Bandwidth | Engineering | 1100 |
| 19 | Testing | Engineering | 1175 |
| 20 | Debt & Next | Engineering | 1353 |
| 21 | Learnings | Engineering | 1171 |

Verified: `node check.mjs` passes, `vite build` exits 0, **0 em dashes**,
0 non-ASCII characters, 21 tabs, no duplicate ids.

## How it was built

Five parallel agents, one per tab group, each given the same voice contract
(no em dashes, mechanics not feature names, honest about CURRENT vs TARGET) plus
its own playbook line ranges. **Four hit a session limit.** Three of those had
already written complete, valid fragments before dying (Product, Architecture,
Security). The Domain group (onboarding, queries, offers, money) was lost and
written by hand afterwards from parts 11–21. The Data group agent completed and
its version was used in preference to a hand-written duplicate, because it had
read parts 29–33 and 43–47 which the hand-written pass skipped.

**Lesson for next time:** agents write fragments to the scratchpad and the parent
assembles. That is what made four failures cost almost nothing.

## The signature decision, do not let it get diluted

A case's region comes from **the offer's university country, not the student's
location in Gaza**. The flows doc says it outright: "Regional Admin access is
never based on locationInGaza". A student with three offers in three countries is
visible to three regional admins, each seeing only their own slice. This is the
spine of the whole page and the Regional Isolation tab exists for it.

## Scaffolding changed outside this folder

- `content/projects/index.js` — imports and registers `gaza40`.
- `check.mjs` — **had an assertion that would have broken**: it asserted
  `hasFullStudy(gaza40) === false` and used Gaza40 as its fallback-page demo.
  Flipped to `true`, moved the fallback demo to Data Sync ETL Hub (which
  genuinely has no written study), and added Gaza40 to the tab-integrity loop.

## Open items

- [ ] **Diagrams.** None. Playbook Part 51 has system flow diagrams and Part 52
      has state machines, both as text. The offer state machine and the
      region-routing model are the two worth exporting.
- [ ] **Screenshots / clips.** None.
- [ ] **`GAZA40-ISSUE-TRACKER.md` unread** (1,386 lines). The Debt tab was built
      from playbook parts 68–69 only, which are the index rather than the full
      ledger with evidence and verification steps.
- [ ] Playbook parts 49–57 (Postman story, code walkthroughs, invariants,
      consistency, security attacks, system design exercises, story bank) were
      not mined at all. Parts 62–66 likewise.
- [ ] Credentials key is `Gaza 40+`, matching `constants/credentials.js`. That
      entry lists 4 portals (super admin, regional admin, volunteer, student) but
      the platform has 5 roles; the reviewer role has no test account.

## Deliberately not here

- Any implication of sole authorship. See the top of this file.
- AI-as-dev-tool disclosure, consistent with the other two case studies.
