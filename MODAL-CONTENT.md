# Project Modal Content (paste-ready for Sanity → Works)

Fill these on each **Works** document. Fields: **My Role**, **The Idea / Problem**, **Engineering Highlights** (add each bullet as its own array item), and **Credentials Search Key** (set only for projects that have test logins — use the EXACT Credentials "Project Name" so the search finds it).

Voice: first person, honest, no em dashes, no buzzwords. Leads with the problem and the engineering decision, not a tech list.

---

## Eudoro — Multi-Vendor Personalized Commerce Platform

**My Role:** `Sole engineer`

**The Idea / Problem:**
```
Marketplaces let you buy a product. They don't let a seller define how a buyer personalizes it, then show that buyer an honest preview before they pay. I built Eudoro so any seller can set up their own customization fields, and every buyer sees their own photo actually warped onto the product instead of pasted flat on top.
```

**Engineering Highlights:** (one bullet each)
```
12 backend microservices and 3 Next.js apps in a single Nx monorepo, built solo
Orders are never created in the checkout request. A signed Razorpay webhook publishes an event, and idempotent RabbitMQ consumers create the order, with dead-letter queues and retries that survive a restart
The live preview warps the buyer's uploaded photo onto the product with a homography transform, so it sits correctly on a tilted keychain instead of looking pasted on
Sellers only get paid after delivery, tracked on an immutable wallet ledger. Razorpay, Shiprocket, Redis, Docker, Nginx, Prometheus and Grafana
```

**Credentials Search Key:** `Eudoro`  *(match to the Credentials doc name)*

---

## Forever Yours — Real-Time Couples App with an AI Companion

**My Role:** `Sole engineer`

**The Idea / Problem:**
```
A private app for couples with real voice and video calls and a watch-together room, but the point is the AI companion. You train it on your own exported chats, and it learns to text like your partner, without inventing memories that never happened.
```

**Engineering Highlights:**
```
Real WebRTC voice and video plus a synced watch-together room over Socket.io
The companion runs on a real RAG pipeline over MongoDB Atlas vector search, and pushes back when you test it with something that never happened instead of making it up
An AI mediator for arguments, designed so one partner's private words can never leak into what the other one sees
Express, Socket.io, Next.js, Jina embeddings, Groq and Gemini, Redis
```

**Credentials Search Key:** `Forever Yours`

---

## Gaza40+ Student Portal — Humanitarian Operations Platform

**My Role:** `Full-stack engineer`

**The Idea / Problem:**
```
A humanitarian org was running student relocations on a mess of spreadsheets, WhatsApp threads and Notion. I replaced all of it with one system for onboarding, offers, funding gaps, documents and case tracking, working in both Arabic and English.
```

**Engineering Highlights:**
```
Five roles, with permissions checked on the server and scoped by region, never trusted from the token
Real-time chat and event-driven notifications, with background CSV exports that recover if the process crashes
Private document storage on Cloudflare R2 with an audit trail
Fully bilingual, so the whole thing works right-to-left in Arabic and left-to-right in English. Next.js, Express, MongoDB, Prisma, Socket.io
```

**Credentials Search Key:** `Gaza40`

---

## Data Sync ETL Hub — SAP, Salesforce & Ecommerce

**My Role:** `Backend engineer`

**The Idea / Problem:**
```
Three systems that never agreed with each other: a file-based SAP setup, Salesforce, and an ecommerce platform. I built a hub that keeps all three in sync both directions across 14 kinds of business records, so nobody has to reconcile by hand.
```

**Engineering Highlights:**
```
SAP drops JSON files, an embedded FTP server and a file watcher pick them up, and each record type routes to its own handler automatically
Adding a new integration is one file, with no config to wire up
Caches OAuth tokens and retries with backoff
When something fails, it writes the failure back to Salesforce so nothing disappears quietly. Node.js, Express
```

**Credentials Search Key:** *(leave empty — internal tool, no public login)*
