# Data Sync ETL Hub case study — progress

Route: `/work/data-sync-etl-hub/:tab` · Content: `./index.js`
Sanity card title: `Data Sync ETL Hub: SAP, Salesforce & Ecommerce`

## The one thing to never get wrong

**This never ran in production.** It ran in UAT against a Salesforce sandbox and
real SAP-format files. The status pill says `UAT`, not `Live`, and the Status tab
states it outright. There are **no throughput, uptime, latency or incident
numbers anywhere on this page**, because nothing in the system measures them.

Second: **the client is anonymised** as "a fastener manufacturer". The real name
appears nowhere in `index.js`. Verify that survives any future edit.

Third: **the commits are design corrections, not outages.** The author confirmed
they were found during build and joint testing. Do not dramatise them.

## Built 2026-08-19, revised same day for the Talend context - 16 tabs, 11,686 words

Product 4,218 - Engineering 7,468.

| # | Tab | Group | Words |
|---|-----|-------|------:|
| 1 | Overview | Product | 533 |
| 2 | Problem | Product | 1055 |
| 3 | What I Built | Product | 819 |
| 4 | The File Contract | Product | 695 |
| 5 | Identity | Engineering | 720 |
| 6 | Routing | Engineering | 813 |
| 7 | Inbound Flow | Engineering | 1023 |
| 8 | Outbound Flow | Engineering | 759 |
| 9 | Errors and Acks | Engineering | 733 |
| 10 | Auth and Tokens | Engineering | 715 |
| 11 | Logging | Engineering | 673 |
| 12 | Doc vs Code | Engineering | 642 |
| 13 | Status | Product | 532 |
| 14 | What Is Missing | Engineering | 710 |
| 15 | My Role | Product | 584 |
| 16 | Learnings | Engineering | 680 |

Verified: `node check.mjs` passes, `vite build` exits 0, **0 em dashes**,
**0 non-ASCII characters**, 16 tabs, no duplicate ids.

## How it was built

No playbook exists for this project. Unlike Eudoro, Shaza and Gaza40, every
claim on this page came from reading source directly, in one pass, no subagents:

- `Desktop/DF-JS-ETL` — 7,764 lines of JS across 60 files, 86 commits
  (2025-12-30 to 2026-08-05). Read in full: `main.js`, both middlewares, all 8
  utils, `ARCHITECTURE.md`. Read closely: `accountUpdateHandler`, `accountHelper`,
  `genericErrorHandler`, `customerCreationErrorHandler`,
  `outbound/salesforce/accountHandler`. Routing table and folder constants
  extracted by grep across all 32 handlers.
- `Desktop/FTP_Share` — the live share. 14 object folders, 94 residual files
  dated 2026-03-09 to 2026-03-20. This is the evidence for which flows were
  actually exercised.
- The client's Salesforce org retrieve (local, not in this repo) — **targeted read only**.
  Confirmed 13 `@RestResource` classes and their `urlMapping` values, the
  `sap_error__c` object, and the `*_To_SAP__c` flag fields. The retrieve is old
  and partial, so absence of a thing is recorded as unknown, never as proof.

## The signature decision, do not let it get diluted

**Failure is modelled as a file, not as a log line.** A handler that cannot
deliver writes the full original payload plus the error text into the object's
`error/` folder, which is itself watched, which triggers an error handler that
reports it into Salesforce as a `sap_error__c` record. The sad path rides the
same routing as the happy path. That is why there are 32 handlers for 14 objects,
and it is the strongest idea on the page.

The honest counterweight, which must stay: **the error folder is evidence, not a
queue.** Nothing re-reads it. `ignoreInitial: true` means a file already sitting
there at startup is never seen. The log line saying "remains for retry" describes
an intention, not a mechanism.

## Doc-vs-code register — this is the differentiator

The `Doc vs Code` tab carries 9 verified discrepancies between `ARCHITECTURE.md`
and the code, plus 1 unresolved item. Three of them are the expensive kind:

1. The account outbound cross-acknowledgement (3-step) was removed in commit
   `a5eaad8`. The doc still describes it **and so does the handler's own docblock**.
2. `OutboundErrors/` legacy error path is dead, not "being consolidated": it is
   not in the watcher's folder list and the folder does not exist on the share.
   The handler still registers at startup, so it looks alive.
3. `SOStatus/inbound` is watched and has a handler, but the folder does not exist
   on the live share.

Unresolved: the ETL posts SO status to `/SoStatus`; the org retrieve has
`/sostatusupdate` and nothing at `/SoStatus`. Recorded as UNKNOWN because the
retrieve is old. **First thing to check against a current org.**

## Scaffolding changed outside this folder

- `content/projects/index.js` — imports and registers `dataSync`.
- `check.mjs` — **had an assertion that would have broken**: it used Data Sync as
  its fallback-page demo and implicitly assumed no written study. Introduced a
  synthetic `unwritten` title ("Some Older Build: No Case Study Yet") to keep the
  fallback path covered, asserted `hasFullStudy(live[2]) === true`, and added
  Data Sync to the tab-integrity loop.
- `pages/ProjectPage/ProjectPage.jsx` — the status pill was hardcoded to the
  green `case__pill--live` modifier. A green pill reading "UAT" contradicts the
  whole page, so the modifier is now applied only when status is exactly `Live`.
  Gaza40 and any other live project are unaffected.

## Open items

- [x] **Talend replacement, confirmed by the author 2026-08-19.** This middleware
      replaced a commercial ETL platform. The org retrieve corroborates it: a
      `Talend_Integration` connected app and a `Talend_Url` remote site are both
      still present and were never removed. The Overview lead, the Problem tab
      (new chapter 01) and the Status tab now carry this as fact.
      **Still unasked: why it was replaced.** Cost, vendor lock-in, nobody in the
      building could maintain it, or a capability gap. Nothing on the page asserts
      a reason; the Problem tab says only that owning it outright was the client's
      call, made before the author started. Do not fill that gap by guessing.
- [x] **Sanity fields.** Confirmed by the author: internal client project, no
      credentials, no public demo, no public repo. The study deliberately sets no
      `liveUrl`, `codeUrl` or `credentialsKey`, so the header renders no action
      buttons. If the Sanity card ever gains a `projectLink`, it will fall
      through and render a "Live" button that goes nowhere.
- [ ] **Diagrams.** None. The three flow shapes (inbound, outbound,
      acknowledgement) are ASCII `pre` blocks. Global CLAUDE.md wants Excalidraw
      in `DF-JS-ETL/docs/diagrams/`; that folder does not exist yet.
- [ ] **Screenshots / clips.** None, and probably none possible. The only visual
      artefacts are the folder tree and log files.
- [ ] `DF-JS-ETL/PRODUCTION_READINESS_AUDIT.md` is named in `.gitignore` but does
      not exist on disk. If the author still has it, the `What Is Missing` tab
      should be checked against it.

## Deliberately not here

- Any claim of a durable idempotency store, BullMQ, distributed workers, DLQs or
  event sourcing. None are in the repository. The `What Is Missing` tab says so.
- Any Salesforce claim beyond the integration surface the org retrieve proves.
  The org is large and long predates this work.
- Any production metric, of any kind.
- AI-as-dev-tool disclosure, consistent with the other three case studies.
