# kaleemahmed.in

Personal site and engineering case studies. React + Vite on the front, Sanity as
the CMS, deployed on Vercel.

```
frontend/          the site
  api/             Vercel serverless functions (the contact form write)
  public/          static files served as-is (og image, robots, sitemap, clips)
  scripts/         build-time scripts (sitemap generation)
  src/
    components/    reusable UI (Navbar, CommandPalette, ClampedText, …)
    container/     the homepage sections (Header, Skills, Work, About, Footer)
    content/       hand-written case studies, one folder per project
    pages/         routed pages (/credentials, /developer, /work/:slug/:tab)
    wrapper/       the section HOCs (full-height + scroll-in animation)
studio/            Sanity Studio, the CMS
docs/              working notes and paste-ready CMS copy
```

## Running it

```bash
cd frontend
npm install
cp .env.example .env     # fill in VITE_APP_SANITY_PROJECT_ID
npm run dev
```

The Studio is a separate app:

```bash
cd studio && npm install && npm run dev
```

## Environment

`frontend/.env.example` lists what is needed and, more importantly, which side
of the wire each value belongs on. **Anything prefixed `VITE_` is inlined into
the JavaScript bundle and is therefore public.** The Sanity write token is not
`VITE_`-prefixed for that reason: it is read only by `frontend/api/contact.js`,
which runs on Vercel, and is configured in the Vercel dashboard.

## Content

Copy lives in Sanity, not in the repo, so the site can change without a deploy.
The exception is the long-form case studies under `frontend/src/content/projects/`,
which are prose with structure (tables, diagrams, stat blocks) that a CMS field
would flatten.

Each study exports tabs of typed blocks rendered by
[`Blocks.jsx`](frontend/src/pages/ProjectPage/Blocks.jsx). Slug resolution is the
one piece of real logic in there — if it breaks, every project card links to a
404 and the build still passes — so it has a self-check:

```bash
node frontend/src/content/projects/check.mjs
```

## Build

```bash
cd frontend && npm run build
```

This regenerates `public/sitemap.xml` from the live Sanity project list before
running Vite. It fails soft: if Sanity is unreachable the sitemap still emits the
static routes rather than breaking the build.
