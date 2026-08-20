# SEO setup — your manual steps

Phase 1 code is done. These four things need your hands, because they need
accounts and DNS I have no access to. Do them in order; the whole thing is
about 30 minutes.

Written for someone who has not done SEO before, so nothing is assumed.

---

## Step 0 — Deploy Phase 1 first

Nothing below works until the new code is live, because Google needs to fetch
the new `robots.txt` and `sitemap.xml` from the real domain.

```bash
cd c:/Users/hp/Desktop/Project-Creds/my-portfolio
git push
```

Wait for Vercel to finish, then run the checks in **Step 4**.

---

## Step 1 — Delete the Netlify site

**Why:** `kaleem.netlify.app` currently serves a full copy of your portfolio.
Google sees two identical sites and has to guess which is the original. It
sometimes guesses wrong, and either way you are splitting your own ranking
between two addresses.

1. Go to <https://app.netlify.com> and log in.
2. Find the site serving `kaleem.netlify.app` in your list.
3. Open it, then go to **Site configuration** (left sidebar).
4. Scroll to the very bottom to **Danger zone**.
5. Click **Delete this site**, type the site name to confirm.

**If you cannot get in:** tell me. Your site already has a `canonical` tag
pointing at `kaleemahmed.in`, which partly mitigates it, but deleting is the
clean fix.

---

## Step 2 — Verify the domain in Google Search Console

**What Search Console is:** a free Google tool that shows you what Google
thinks of your site — which pages it has indexed, what searches you appear
for, and what is broken. Without it you are guessing. It does not change your
ranking; it is the dashboard, not the engine.

You said you can edit DNS, so we use the DNS method. It verifies the whole
domain including every subdomain, which is better than the file method.

1. Go to <https://search.google.com/search-console>.
2. Click **Add property** (top-left dropdown).
3. Choose the **Domain** box on the left, not "URL prefix".
4. Enter `kaleemahmed.in` (no `https://`, no `www`).
5. Google shows you a **TXT record** that looks like
   `google-site-verification=abc123...`. Copy it.
6. Go to wherever you bought the domain (GoDaddy, Namecheap, Hostinger,
   BigRock…) and open its **DNS settings** / **DNS management**.
7. Add a new record:
   - **Type:** `TXT`
   - **Name / Host:** `@` (this means the root domain; some registrars want
     it blank instead)
   - **Value:** the whole `google-site-verification=...` string
   - **TTL:** leave default
8. Save, wait 5–15 minutes, then click **Verify** in Search Console.

> If verify fails, wait longer. DNS changes take time to spread. An hour is
> normal, and it is almost never actually broken.

**Don't know your registrar?** Run `whois kaleemahmed.in`, or check the email
you got when you bought it.

---

## Step 3 — Submit the sitemap

**What a sitemap is:** a list of the pages you want indexed. It does not
force Google to index them, it just means Google does not have to discover
them by crawling links. For a small site it mostly speeds things up.

> **Do Step 0 first.** Until the new code is deployed, `kaleemahmed.in/sitemap.xml`
> still returns your homepage HTML, and Google will reject it. Check with:
>
> ```bash
> curl -s https://kaleemahmed.in/sitemap.xml | head -1
> # must print "<?xml version..." — if it prints "<!DOCTYPE html>", deploy first
> ```

Once verified:

1. In Search Console, open **Sitemaps** in the left sidebar.
2. Enter the **full URL**: `https://kaleemahmed.in/sitemap.xml`
3. Click **Submit**. Status should become "Success" within a day.

> **"Invalid sitemap address"?** You have a *Domain* property, which covers
> every protocol and subdomain, so Search Console cannot guess a prefix and
> needs the whole URL. The short `sitemap.xml` form only works on *URL prefix*
> properties.

Then ask Google to look at your homepage right away:

1. Paste `https://kaleemahmed.in/` into the search bar at the very top of
   Search Console.
2. Click **Request indexing**.

Do the same for each project page once you have a moment:

- `https://kaleemahmed.in/work/eudoro`
- `https://kaleemahmed.in/work/shaza`
- `https://kaleemahmed.in/work/gaza40-student-portal`
- `https://kaleemahmed.in/work/data-sync-etl-hub`
- `https://kaleemahmed.in/work/ecou`

**Bonus, 2 minutes:** do the same at
<https://www.bing.com/webmasters>. Bing lets you import everything straight
from Search Console in one click. Bing matters more than its market share
suggests, because ChatGPT's web search is built on it.

---

## Step 4 — Verify the deploy actually worked

Run these after Vercel finishes. Each one should match the expected result.

```bash
# robots.txt must be a text file, NOT your homepage HTML
curl -s https://kaleemahmed.in/robots.txt | head -3
#   expect: "User-agent: *"    NOT "<!DOCTYPE html>"

# sitemap.xml must be XML
curl -s https://kaleemahmed.in/sitemap.xml | head -2
#   expect: "<?xml version..."

# a garbage URL must now 404, not return 200
curl -s -o /dev/null -w "%{http_code}\n" https://kaleemahmed.in/nonsense-url-test
#   expect: 404

# www must redirect to the bare domain
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.kaleemahmed.in
#   expect: 308 -> https://kaleemahmed.in/

# real project pages must still work
curl -s -o /dev/null -w "%{http_code}\n" https://kaleemahmed.in/work/eudoro/overview
#   expect: 200
```

Then check the share preview by pasting `https://kaleemahmed.in` into:

- <https://www.linkedin.com/post-inspector/> — shows how it renders on LinkedIn
- <https://search.google.com/test/rich-results> — confirms Google reads your
  Person structured data

---

## Step 5 — Free backlinks that build your identity

This is the part that actually separates you from the other Kaleem Ahmeds
(there is a Principal Engineer at Microsoft with your name, and he currently
owns the search results).

Google builds an "entity" for a person by finding the same identity linked
across multiple sites that point at each other. Your site now lists your
LinkedIn, GitHub, LeetCode and GeeksforGeeks in its structured data. The
links need to point back.

- [ ] **LinkedIn** → edit profile → **Contact info** → **Website** →
      add `https://kaleemahmed.in` (choose "Portfolio" as the type).
      Also put it in your About section as plain text.
- [ ] **GitHub** → your profile → **Edit profile** → **Website** field →
      `https://kaleemahmed.in`.
- [ ] **GitHub profile README** — create a repo named `KaleemAhmed123`
      (same as your username) with a `README.md`. It renders on your profile
      page. Use `GITHUB-PROFILE-README.md` from this repo.

      > Correction to something I said earlier: GitHub puts `rel="nofollow"`
      > on links inside READMEs, so this does **not** pass link authority.
      > It still matters, because your name and your domain appearing together
      > on a high-authority page is exactly the association Google uses to tell
      > you apart from the other Kaleem Ahmeds. Just do not expect ranking
      > power from the link itself.

- [ ] **Fix the GitHub profile bio.** It is the meta description Google shows
      for `github.com/KaleemAhmed123`, and it currently reads:
      *"I've sound understanding of web technologies and Salesforce development
      including modern Javascript, React, node/express,, css, html etc"* —
      missing word, double comma, and the old positioning. Replace with:

      ```
      Backend & full-stack engineer. Node, TypeScript, Python, FastAPI.
      Microservices, event-driven systems, and the observability around them.
      ```

- [ ] **Add descriptions to your repos.** 30 of your 37 public repos have none.
      The description is what shows on your profile and in GitHub search.
      Start with the ones you would want a recruiter to open.

- [ ] **Pin the right repos.** Profile → "Customize your pins". Pick the work
      that matches the positioning, not the practice repos.
- [ ] **LeetCode** and **GeeksforGeeks** → add the website link to your
      profile where they allow it.
- [ ] **Resume PDF** — you already link "Portfolio". Make sure it points at
      `https://kaleemahmed.in` and not the old Netlify URL.

---

## What to expect, honestly

| When | What happens |
|---|---|
| Within days | Google re-crawls, picks up the new title/description, stops seeing fake 200 pages |
| 2–4 weeks | Your site starts appearing for "Kaleem Ahmed portfolio" and similar |
| 4–12 weeks | Realistic window to start outranking the other Kaleem Ahmeds on the plain name |
| Never | "software engineer", "AI engineer", "full stack engineer" — those return job boards, not people. Not a failure of the work; that is how those searches behave. |

The single biggest remaining lever is **Phase 2**: your pages are still
rendered by JavaScript, so Google has to work harder than it should to read
them. Next.js fixes that at the root.

---

## What changed in the code (for reference)

| File | Change |
|---|---|
| `frontend/vercel.json` | Catch-all rewrite replaced with explicit routes, so real files serve and unknown URLs 404. Added `www` → apex 301. |
| `frontend/index.html` | One accurate description instead of three stale ones. New title, canonical, Open Graph, Twitter card, `Person` + `WebSite` structured data, and a no-JS content fallback. |
| `frontend/public/robots.txt` | New. Allows everything except `/credentials`, points at the sitemap. |
| `frontend/scripts/generate-sitemap.mjs` | New. Builds `sitemap.xml` from live Sanity data on every build, so project URLs never go stale. |
| `frontend/src/seo.js` | New. Per-route title/description/canonical, no extra dependency. |
| `frontend/src/pages/ProjectPage/ProjectPage.jsx` | Real per-case-study meta; unknown slugs go `noindex`. |
| `frontend/src/pages/CredentialsPage.jsx` | `noindex`, matching robots.txt. |
| `frontend/src/container/Header/Header.jsx` | Added the page `<h1>` (screen-reader only — the visible headline is a decorative greeting). |
| `frontend/public/og.png` | New 1200×630 share image. |
| `frontend/public/_redirects` | Deleted — Netlify leftover. |
