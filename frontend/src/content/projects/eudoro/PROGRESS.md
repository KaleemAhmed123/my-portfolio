# Eudoro case study — progress

Route: `/work/eudoro/:tab` · Content: `./index.js`
Code: `Desktop/personalized-wallah-monorepo`

## Sources, in precedence order

1. `Project-Details-Playbook/Eudoro/EUDORO-PLAYBOOK.md` — verified against source, **wins conflicts**
2. `Project-Details-Playbook/Eudoro/EUDORO-CHATGPT-PLAYBOOK.md` — recovered from the ChatGPT share link 2026-08-19, deeper per service
3. `Project-Details-Playbook/Eudoro/EUDORO-ISSUE-TRACKER.md`

## Tabs — 15, ~11,090 words

| # | Tab | Words | Status |
|---|-----|-------|--------|
| 1 | Overview | 326 | done — tight what-it-is, story moved to Problem |
| 2 | Problem | 850 | done — first-person, seller-side, scaling argument |
| 3 | Solution | 2465 | done — chaptered long-form, three journeys, every feature |
| 4 | Features | 1792 | done — 14 groups, mechanic per bullet, not headlines |
| 5 | My Role | 448 | done — ownership table + 5-stage evolution |
| 6 | Try It | 256 | hand-written, not from playbook — personas + 6 flows |
| 7 | Architecture | 661 | done, **diagram debt** — positioning, request lifecycle, sync/async tables |
| 8 | Services | 793 | done — 12-service ownership matrix + gateway/auth/product in depth |
| 9 | Decisions | 762 | done — 14-row table + 4 defense cards |
| 10 | Challenges | 949 | done — 7 war stories |
| 11 | Workflows | 368 | done, **diagram debt** — full business event chain + 5 flows |
| 12 | Data Model | 321 | **source exhausted** — customization schema + worked example |
| 13 | Security | 455 | done — 13 cards |
| 14 | Infra | 284 | **source exhausted** |
| 15 | What's Next | 241 | **source exhausted** |

**Removed:** Trade-offs. Debt is no longer published. Architecture leads with the
"pragmatic microservices" positioning instead: independently containerized and
deployable services, deliberately shared infrastructure, logical ownership
boundaries. Accurate, and it does not claim database-per-service.

## Clips

Source files live in `Desktop/project-videos/`. Copies are committed to
`frontend/public/clips/` and served straight off the static CDN.

| Clip | Size | Where it sits |
|---|---|---|
| `eudoro-user-flow.mp4` | 6 MB | Solution, end of chapter 02 (the buyer) |
| `eudoro-seller-flow.mp4` | 15 MB | Solution, end of chapter 03 (the seller) |
| admin flow | — | **not recorded yet.** Chapter 04 has no video block. Add one when the clip exists. |

21 MB of binaries now live in the repo. If that becomes annoying, the alternative
is uploading them to Sanity and reading the URL from the `works` doc, the way
`clipUrl` already works for the project cards. Not worth doing until it hurts.

Videos use `preload="metadata"`, so the 15 MB file does not download until someone
presses play. Poster frames are grabbed at the 2s mark, scaled to 1280 wide, and
sit beside each clip as `<name>.jpg`. `Blocks.jsx` derives the poster path from
the video path, so a new clip only needs its `.jpg` dropped in next to it:

```
ffmpeg -y -ss 2 -i clip.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 4 clip.jpg
```

## Where the remaining depth is

The tabs marked *source exhausted* are short because both playbooks are fully
mined for them, not because they were skimped. More words there would mean making
things up.

Real remaining sources, if you want those tabs longer:

- [ ] **The nine services with one-line entries.** `EUDORO-CHATGPT-PLAYBOOK.md` Part 3
      covers only gateway, auth and product before the session ends. Order, payment,
      delivery, payout-wallet, chat, notification, seller and admin would each
      support a card like the three that exist.
- [ ] **`EUDORO-PLAYBOOK.md` Part 3** has per-service routes, failure modes and Q&A
      for all twelve. Used lightly so far — it is the obvious next source.
- [ ] **Part 4, the frontend applications.** Barely touched. State management split,
      the SSR rule, cart identity. Would support a "Frontend" tab.

## Open items

- [ ] **Diagrams.** The monorepo has 25 Excalidraw diagrams under `docs/diagrams/`
      plus rendered flows under `documentation/diagrams/`. Export the topology one
      and the order-to-payout saga, drop them in, remove `diagramDebt: true` from
      Architecture and Workflows.
- [ ] **Thin by source, not by choice.** Features lists moderation, badges, wishlist
      and offers at name level only. Neither playbook documents a single mechanic
      for any of them: "admin moderation" and "product moderation" are the entire
      written record, and badges appear nowhere at all. Everything else in that tab
      carries a real mechanic. Give me 3 or 4 bullets on what an admin can actually
      do to a listing or a shop, and what earns a badge, and they come up to the
      standard of the rest.
- [ ] **Screenshots.** Two flow clips are in. Still no stills of individual screens.
- [ ] Stats are hardcoded twice in `index.js` (top-level `stats` and the Overview
      block). Fine for now; hoist if a third appears.

## Deliberately not here

- AI-as-dev-tool disclosure. Interview-only, per the build spec.
- Published debt. Removed 2026-08-19.
- Testimonials, build log, LOC counts.
