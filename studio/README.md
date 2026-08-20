# Portfolio Studio

Sanity Studio for [kaleemahmed.in](https://kaleemahmed.in). Everything the site
renders — intro copy, skills, projects, case-study metadata and the test
credentials — is edited here, not in the React code.

```bash
npm install
npm run dev      # http://localhost:3333
npm run deploy   # push the Studio to sanity.studio
```

Project `9482im54`, dataset `production`. Schemas live in [`schemas/`](schemas)
and are registered in [`schemas/index.js`](schemas/index.js); a document type
that is not in that array will not show up in the Studio.

Paste-ready copy for the Works documents is in
[`../docs/sanity-works-content.md`](../docs/sanity-works-content.md).
