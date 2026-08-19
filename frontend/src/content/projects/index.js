// explicit /index.js so plain node can run check.mjs, not just Vite's resolver
import eudoro from "./eudoro/index.js";
import shaza from "./shaza/index.js";
import gaza40 from "./gaza40/index.js";
import dataSync from "./dataSync/index.js";

// Projects with a written playbook get a full case study. Everything else falls
// back to a short one built from the Sanity fields the card already carries, so
// deleting the old modal doesn't leave those projects with nowhere to go.
const studies = [eudoro, shaza, gaza40, dataSync];

export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// "Eudoro: Multi-Vendor Personalized Commerce Platform" -> "Eudoro".
// Splits on a colon or a *spaced* dash, so hyphenated words survive.
const shortTitle = (title) =>
  String(title || "").split(/\s*[:—–]\s+|\s+-\s+/)[0].trim();

const studyForTitle = (title) => {
  const t = String(title || "").toLowerCase();
  return studies.find((s) => s.match.some((m) => t.includes(m))) || null;
};

export const slugForWork = (work) =>
  studyForTitle(work?.title)?.slug || slugify(shortTitle(work?.title));

export const hasFullStudy = (work) => Boolean(studyForTitle(work?.title));

// Sanity fields -> the same tab shape a written study uses.
const fallbackStudy = (work) => {
  const tabs = [];

  if (work?.problem || work?.description) {
    tabs.push({
      id: "overview",
      label: "Overview",
      group: "The Product",
      blocks: [
        work?.problem && ["lead", work.problem],
        work?.description && ["p", work.description],
      ].filter(Boolean),
    });
  }

  if (work?.highlights?.length) {
    tabs.push({
      id: "engineering",
      label: "Engineering",
      group: "The Engineering",
      blocks: [["list", "The hard parts", work.highlights]],
    });
  }

  if (work?.tags?.length) {
    tabs.push({
      id: "stack",
      label: "Stack",
      group: "The Engineering",
      blocks: [["list", null, work.tags]],
    });
  }

  if (work?.credentialsKey) {
    tabs.push({
      id: "try-it",
      label: "Try It",
      group: "The Product",
      blocks: [
        ["p", "Test logins are on the credentials page. They are shared accounts, so expect other people's test data."],
      ],
    });
  }

  return {
    slug: slugForWork(work),
    title: shortTitle(work?.title) || work?.title || "Project",
    tagline: work?.description || "",
    role: work?.role || "",
    liveUrl: work?.projectLink || "",
    codeUrl: work?.codeLink || "",
    credentialsKey: work?.credentialsKey || "",
    stack: work?.tags || [],
    stats: [],
    tabs,
    isShort: true,
  };
};

// The page has the Sanity doc in hand; a written study wins, and its live/code
// links fall back to whatever Sanity holds so those stay editable without a deploy.
export const studyFor = (work) => {
  const written = studyForTitle(work?.title);
  if (!written) return fallbackStudy(work);
  return {
    ...written,
    liveUrl: written.liveUrl || work?.projectLink || "",
    codeUrl: written.codeUrl || work?.codeLink || "",
    credentialsKey: written.credentialsKey || work?.credentialsKey || "",
  };
};

export default studies;
