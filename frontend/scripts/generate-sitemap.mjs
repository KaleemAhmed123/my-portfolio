// Writes public/sitemap.xml from the live Sanity works list, so project URLs
// stay correct without anyone remembering to edit a file. Runs before vite build.
//
// Deliberately fail-soft: if Sanity is unreachable at build time we still emit a
// valid sitemap with the static routes, because a missing sitemap is worse than
// an incomplete one and a portfolio build should never fail over SEO metadata.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { slugForWork } from '../src/content/projects/slugs.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'public', 'sitemap.xml');
const ORIGIN = 'https://kaleemahmed.in';

// Vite only exposes VITE_* to the client; in Node we read the raw env, falling
// back to the local .env file so `npm run build` works off a fresh clone.
const readEnv = (key) => {
  if (process.env[key]) return process.env[key];
  try {
    const raw = fs.readFileSync(path.join(HERE, '..', '.env'), 'utf8');
    // The file is written as `KEY = value`, spaces included, which is what
    // dotenv tolerates but a naive startsWith does not.
    const hit = raw.split(/\r?\n/).find((l) => new RegExp(`^\\s*${key}\\s*=`).test(l));
    return hit ? hit.slice(hit.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '') : '';
  } catch {
    return '';
  }
};

const urlTag = (loc, priority, changefreq) =>
  `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const fetchWorks = async () => {
  const id = readEnv('VITE_APP_SANITY_PROJECT_ID');
  if (!id) return [];
  const query = encodeURIComponent('*[_type == "works"]{title}');
  const res = await fetch(
    `https://${id}.api.sanity.io/v2023-03-03/data/query/production?query=${query}`,
    { signal: AbortSignal.timeout(15000) }
  );
  const json = await res.json();
  return json.result || [];
};

const run = async () => {
  let works = [];
  try {
    works = await fetchWorks();
  } catch (err) {
    console.warn(`[sitemap] Sanity fetch failed (${err.message}); writing static routes only.`);
  }

  // /credentials is excluded on purpose, matching robots.txt.
  const urls = [
    urlTag(`${ORIGIN}/`, '1.0', 'weekly'),
    // Linked from the footer of the live products, so it picks up real traffic.
    urlTag(`${ORIGIN}/developer`, '0.7', 'monthly'),
  ];

  const slugs = [...new Set(works.map(slugForWork).filter(Boolean))].sort();
  for (const slug of slugs) {
    urls.push(urlTag(`${ORIGIN}/work/${slug}`, '0.8', 'monthly'));
  }

  const doc =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  fs.writeFileSync(OUT, doc);
  console.log(`[sitemap] wrote ${urls.length} urls -> public/sitemap.xml`);
  if (!slugs.length) console.warn('[sitemap] no project URLs found — check Sanity access.');
};

run().catch((err) => {
  console.error('[sitemap] failed:', err.message);
  process.exit(0); // never break the build over a sitemap
});
