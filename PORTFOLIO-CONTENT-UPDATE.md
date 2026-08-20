> SUPERSEDED 2026-08-19. The live homepage copy is in Sanity and no longer matches this
> file: positioning moved back to backend-heavy full-stack, AI is framed as adaptability,
> and the Acordly/Primble project was removed entirely. Kept only for history.

# Portfolio Content Update (paste-ready for Sanity Studio)

Voice: written to sound like you, not like generated marketing copy. No em dashes, no buzzwords, first person.
Positioning: Full-Stack AI Engineer who builds and runs whole systems, usually solo.
Everything maps to your Sanity schema fields. Open Studio, find the document, paste each field.
`‹fill in›` means I couldn't be sure of a link. Numbers are honest (these projects are pre-launch, so no traffic claims).

---

## 1) HERO

### Tagline options (the one-liner near your name at the top)
This probably lives in the Header/Home component, not in Sanity. Pick one and I'll wire it in.

1. From an empty repo to production, usually solo.
2. Whole systems, not just features.
3. I build the backend, the AI inside it, and the parts that break at 3am.
4. I design, build, and run production systems. Backend to AI, front to back.
5. Backend-heavy engineer who owns the whole thing.

My pick: **#1** as the punch line, with **Full-Stack AI Engineer** as the role label under your name.

### Intro paragraphs (document type: `intro`)

**greeting**
```
Hello There! 👋
```

**section1**
```
I'm Kaleem. I build backend-heavy systems and the AI that runs inside them, and I usually own the whole thing, from the first architecture call to the service running in production. Most of what I've shipped, I built as the only engineer on it.
```

**section2**
```
My comfort zone is the backend: microservices, RabbitMQ event flows, payment and order pipelines that can't afford to double-charge anyone, Redis, and enough Prometheus and Grafana to know when something's on fire. On the AI side I build real LLM features: RAG with vector search, OCR that reads insurance documents, agentic workflows. The model is the easy part. The work is making it reliable enough to trust. I mostly work in Node, TypeScript, Python and FastAPI, with Next.js and React on top.
```

**section3**
```
Building things mostly solo taught me to care about the parts that only show up in production: keeping data consistent, and knowing the second something breaks. Under all of it is a lot of DSA, over 1500 problems on LeetCode and GeeksforGeeks. I lean on AI heavily while I build, but I'm still the one making the calls.
```

---

## 2) ABOUTS (document type: `abouts`) — the 4 cards

Update **title** + **description** on each; keep the existing images. Order below leads with the backend depth, then the AI angle. If you want to hit the AI-engineer brand harder, swap cards 1 and 2.

### Card 1 — title: `Backend & Systems`
```
This is where I'm most at home. I build services in Node, Express, TypeScript, Python and FastAPI, wire them together with RabbitMQ, and back them with MongoDB, Postgres and Redis. I've built idempotent payment and order pipelines, auth and RBAC, event-driven workflows, and the Prometheus and Grafana setup to watch it all. What I actually care about is the stuff that bites you later: consistent data, clean boundaries between services, and code that still makes sense when something's broken at midnight.
```

### Card 2 — title: `AI / LLM Engineering`  (fixes the old "Adaptibilty" typo)
```
I put real AI into products: LLM pipelines, RAG with vector search, OCR that reads documents, prompt and context work, agentic workflows with Claude and Codex. The part I obsess over isn't the model call, it's everything around it. Grounding answers in real data, refusing to guess, keeping cost sane, and keeping a human in the loop. AI speeds me up. It doesn't get to be wrong on my behalf.
```

### Card 3 — title: `Problem Solving`
```
I've solved over 1500 DSA problems on LeetCode and GeeksforGeeks, and it shows up in the day job more than I expected. Reasoning about edge cases, picking the right tradeoff, working out why a system is slow. It's mostly the habit of breaking a messy problem down until the answer is obvious.
```

### Card 4 — title: `Frontend`  (fixes the old "Devolopment" typo)
```
I build the frontend too, in React, Next.js and Tailwind, and not just the pretty part. I care about the API integration, the loading and error and empty states, the role-based views, all the places a real app actually lives. It should match the backend contract and be easy to change six months later.
```

---

## 3) WORKS (document type: `works`) — 5 projects

Set **title**, **description**, **projectLink**, **codeLink**, **tags** on each. Add tags as SEPARATE entries (that's what caused `"RBAC, Case Management"` to render as one messy tag). Delete the old **Helping Crypto** doc.
Order: Eudoro, Forever Yours, Gaza40+, ETL Hub.

### Work 1 — Eudoro (your current "Personalized Wallah" doc)
**title**
```
Eudoro — Multi-Vendor Personalized Commerce Platform
```
**description**
```
Built this one solo. It's a multi-vendor marketplace for personalized products: 12 backend microservices and 3 Next.js apps in an Nx monorepo. Sellers set up their own customization fields (typed inputs, validation rules, reusable templates), and buyers get a live preview that actually warps their uploaded photo onto the product using a homography transform, so it sits on a tilted keychain correctly instead of looking pasted on. Orders never get created in the checkout request. A signed Razorpay webhook publishes an event, and idempotent RabbitMQ consumers pick it up, with dead-letter queues and retries that survive a restart. Sellers only get paid after delivery, tracked on an immutable ledger. Razorpay, Shiprocket, Redis, Docker, Nginx, Prometheus and Grafana.
```
**projectLink**: `‹eudoro.art if you want it public; it's pre-launch, so blank is fine›`
**codeLink**: `https://github.com/KaleemAhmed123/personalized-wallah-monorepo`
**tags** (one per entry): `Microservices` · `RabbitMQ` · `Next.js` · `TypeScript` · `Razorpay` · `Docker`

### Work 3 — Forever Yours / Shaza  (NEW — add this document)
**title**
```
Forever Yours — Real-Time Couples App with an AI Companion
```
**description**
```
A private app for couples, with real WebRTC voice and video calls, a synced watch-together room, and an AI companion. The interesting part is the companion. You can train it on your own exported chats from WhatsApp, Telegram or Instagram, and it learns to text like your partner. It runs on a real RAG pipeline over MongoDB Atlas vector search, and I built it to refuse to make memories up: it pushes back when you test it with something that never happened. There's also an AI mediator for arguments, designed so one partner's private words can never leak into what the other one sees. Express, Socket.io, Next.js, Jina embeddings, Groq and Gemini, Redis.
```
**projectLink**: `‹fill in if deployed, else blank›`
**codeLink**: `‹fill in / private›`
**tags** (one per entry): `WebRTC` · `Socket.io` · `RAG` · `Vector Search` · `Next.js` · `AI`

### Work 4 — Gaza40+ (your existing doc)
**title**
```
Gaza40+ Student Portal — Humanitarian Operations Platform
```
**description**
```
A full-stack platform for a humanitarian org helping students in Gaza relocate for university. It replaced a mess of spreadsheets, WhatsApp threads and Notion with one system for onboarding, offers, funding gaps, documents and case tracking. Five roles, with permissions checked on the server and scoped by region, never trusted from the token. Real-time chat, event-driven notifications, background CSV exports that recover if the process crashes, and private document storage on Cloudflare R2 with an audit trail. It's bilingual, so the whole thing works in Arabic and English. Next.js, Express, MongoDB, Prisma, Socket.io.
```
**projectLink**: `https://portal.gaza40plus.co.uk`
**codeLink**: `https://github.com/KaleemAhmed123/Gaza40-Student-Portal`
**tags** (one per entry): `Next.js` · `RBAC` · `Socket.io` · `MongoDB` · `Full Stack`

### Work 5 — ETL Hub (your existing "JS ETL Platform" doc)
**title**
```
Data Sync ETL Hub — SAP, Salesforce & Ecommerce
```
**description**
```
A Node.js hub that keeps a file-based SAP system, Salesforce and an ecommerce platform in sync, both directions, across 14 kinds of business records. SAP drops JSON files, an embedded FTP server and a file watcher pick them up, and each record type routes to its own handler automatically. Adding a new integration is one file, with no config to wire up. It caches OAuth tokens, retries with backoff, and when something fails it writes the failure back to Salesforce so nothing disappears quietly.
```
**projectLink**: `‹blank — internal tool, no public URL›`  (the current value "Backend" is invalid, clear it)
**codeLink**: `‹blank / private›`
**tags** (one per entry): `Node.js` · `Express` · `Salesforce` · `SAP` · `ETL`

---

## 4) EXPERIENCES (document type: `experiences` → `workExperience`)

Your current data stores the paragraph in the **company** field, with **name** holding the role. Keep that if it renders correctly, otherwise move the paragraph into **desc**. Check in Studio.

### Astrea IT Services — `2024 – Present`
**name (role):** `Software Engineer — Astrea IT Services`
**description:**
```
Backend systems, cloud, AI workflows and full-stack work with Node, Python, Docker, AWS, React/Next.js and Salesforce. Built the ETL hub that keeps SAP, Salesforce and ecommerce in sync. Also built a Salesforce to Airtable sync and a few other integrations. Most of what I care about here is reliability: good logging, real error handling, CI/CD, and code the next person can actually work with.
```

### Freelance Web Developer — `2023 – 2024`
**name (role):** `Web Developer — Freelance`
**description:**
```
Freelance web work while I was in college, helping small orgs get a real site up. Built the Raah Foundation NGO site end to end, from working out what they actually needed to the responsive build, deployment, and the feedback rounds after. It's where I first learned to talk to non-technical clients and own something all the way to launch.
```

---

## 5) SKILLS (document type: `skills`) — group them into an intentional stack

Right now it's a flat grid of ~21 skills, which reads as a dump. Grouping it makes it look deliberate. The current schema has no category field, so this needs a small code change (add a `category` to the skills schema, then group in the Skills component). **I can make that change for you in the repo.** Once it's grouped, the stack reads like this:

**Languages & Backend**
`JavaScript` · `TypeScript` · `Python` · `Node.js` · `Express` · `FastAPI`

**Data & Messaging**
`MongoDB` · `PostgreSQL` · `Prisma` · `Redis` · `RabbitMQ`

**AI / LLM**
`OpenAI & LLMs` · `RAG & Vector Search` · `OCR` · `Prompt Engineering` · `Agentic Workflows`

**Frontend & Realtime**
`React` · `Next.js` · `Tailwind CSS` · `Socket.io` · `WebRTC`

**DevOps & Cloud**
`Docker` · `AWS` · `Nginx` · `Prometheus & Grafana`

**Foundations**
`DSA` · `Git & GitHub` · `Salesforce`

Notes:
- Each new skill still needs an `icon` image. Grab SVGs from https://devicon.dev to match your existing style.
- The vague ones ("AI Workflows", "AI Assisted Coding") fold into the AI / LLM group as `OpenAI & LLMs` / `Prompt Engineering`.
- If you'd rather not touch code, keep the flat list but at least reorder the documents so related skills sit next to each other (same groups, just ordered).

---

## 6) PERSONAL INFO (document type: `personalInfo`)

- **website:** currently `https://kaleem.netlify.app`. If `kaleemahmed.in` is the canonical one now, update it.
- Everything else looks fine.

---

### One reminder
Tags and skills are arrays. In Studio, click "Add item" for each entry instead of typing a comma-separated string.
