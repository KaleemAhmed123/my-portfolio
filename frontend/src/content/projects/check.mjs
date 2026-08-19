// node src/content/projects/check.mjs
// Slug resolution is the one bit of real logic here: if it breaks, every project
// card links to a 404 and the build still passes. Titles below are the live
// Sanity values.
import assert from "node:assert/strict";
import { slugForWork, hasFullStudy, studyFor } from "./index.js";

const live = [
  "Gaza40+ Student Portal: Humanitarian Operations Platform",
  "Forever Yours: Real-Time Couples App with an AI Companion",
  "Data Sync ETL Hub: SAP, Salesforce & Ecommerce",
  "Eudoro: Multi-Vendor Personalized Commerce Platform",
];

const slugs = live.map((title) => slugForWork({ title }));

assert.deepEqual(slugs, [
  "gaza40-student-portal",
  "shaza", // legacy card name, written study wins
  "data-sync-etl-hub",
  "eudoro",
]);

// slugs must be unique or two cards fight over one route
assert.equal(new Set(slugs).size, slugs.length, "slug collision");

// written studies vs generated fallbacks
assert.equal(hasFullStudy({ title: live[3] }), true);
assert.equal(hasFullStudy({ title: live[0] }), true);

// a fallback still produces a usable page from Sanity fields alone
const fallback = studyFor({
  title: live[2],
  description: "desc",
  problem: "prob",
  highlights: ["a", "b"],
  tags: ["Next.js"],
  projectLink: "https://example.com",
});
assert.equal(fallback.title, "Data Sync ETL Hub");
assert.equal(fallback.liveUrl, "https://example.com");
assert.ok(fallback.tabs.length >= 3, "fallback needs tabs to render");

// a written study keeps its own copy but inherits links Sanity still owns
const written = studyFor({ title: live[3], codeLink: "https://github.com/x" });
assert.equal(written.slug, "eudoro");
assert.equal(written.liveUrl, "https://eudoro.art");
assert.equal(written.codeUrl, "https://github.com/x");

// every tab needs an id the router can address, and blocks to render
for (const study of [
  studyFor({ title: live[3] }),
  studyFor({ title: live[1] }),
  studyFor({ title: live[0] }),
]) {
  const ids = study.tabs.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate tab id in ${study.slug}`);
  for (const tab of study.tabs) {
    assert.ok(tab.id && tab.label && tab.group, `incomplete tab in ${study.slug}`);
    assert.ok(tab.blocks.length > 0, `empty tab ${study.slug}/${tab.id}`);
  }
}

console.log("ok:", slugs.join(", "));
