// Slug resolution only, kept apart from the studies themselves. The homepage
// project cards need to build /work/:slug links, and importing it from
// index.js dragged all four case studies (~3,500 lines of prose) into the
// initial bundle for visitors who never open one.
//
// The cost is that this table has to stay in step with the `slug`/`match`
// fields in each study; check.mjs asserts that it does.
const SLUGS = [
  { slug: "eudoro", match: ["eudoro"] },
  { slug: "shaza", match: ["shaza", "forever yours"] },
  { slug: "gaza40-student-portal", match: ["gaza40", "gaza 40"] },
  { slug: "data-sync-etl-hub", match: ["data sync", "etl hub"] },
];

export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// "Eudoro: Multi-Vendor Personalized Commerce Platform" -> "Eudoro".
// Splits on a colon or a *spaced* dash, so hyphenated words survive.
export const shortTitle = (title) =>
  String(title || "").split(/\s*[:—–]\s+|\s+-\s+/)[0].trim();

export const writtenSlugFor = (title) => {
  const t = String(title || "").toLowerCase();
  return SLUGS.find((s) => s.match.some((m) => t.includes(m)))?.slug || null;
};

export const slugForWork = (work) =>
  writtenSlugFor(work?.title) || slugify(shortTitle(work?.title));

export default SLUGS;
