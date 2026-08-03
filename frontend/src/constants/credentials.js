// ============================================================================
//  TEST-ACCESS CREDENTIALS  —  LOCAL FALLBACK / SEED ONLY.
// ----------------------------------------------------------------------------
//  The live source of truth is Sanity (document type "credentials", schema at
//  backend_sanity/schemas/credentials.js). The /credentials page fetches from
//  Sanity; this file is only used as a fallback while the CMS has no
//  credentials documents yet, and as a shape reference for what to enter in
//  Sanity Studio.
//
//  Structure:  Project → Environment → Portal (role) → login details
//    • Environments let a project carry e.g. "Testing" now and "Live" later
//      (different URLs/DB) — the UI shows tabs to switch between them.
//    • Portals are the subdomains / roles, each with a URL, email, password.
//    • DEMO data only — never put real secrets here or in the CMS.
//
//  To manage real content: add "Test Access Credentials" documents in Sanity
//  Studio (cd backend_sanity && npm run dev).
// ============================================================================

export const credentials = [
  {
    id: "Eudoro",
    name: "Eudoro",
    description: "Multi-vendor e-comm for customized products — separate portals for admins, sellers, buyers and live monitoring.",
    tags: ["Full Stack", "E-commerce", "RBAC"],
    // Optional: a single "main" link for the project (shown as the big CTA).
    projectLink: "https://eudoro.art",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox data — safe to create/delete anything. Resets periodically.",
        portals: [
          {
            role: "User",
            url: "https://eudoro.art",
            email: "kaleem@astreait.com",
            password: "hayat@#1234",
            note: "Shopper experience: browse, cart, checkout. one can also create account",
          },
          {
            role: "Seller",
            url: "https://seller.eudoro.art",
            email: "shaamidreez@gmail.com",
            password: "Shaam@#1234",
            note: "Storefront management, products, inventory.",
          },
          {
            role: "Admin",
            url: "https://admin.eudoro.art",
            email: "shaamidreez@gmail.com",
            password: "hayat@#1234",
            note: "Full dashboard: users, vendors, orders, payouts.",
          },
          {
            role: "Monitoring",
            url: "https://monitoring.eudoro.art",
            email: "",
            password: "",
            note: "System health, metrics & logs dashboard.",
          },
        ],
      },
      // When Eudoro goes live, add another environment here, e.g.:
      // {
      //   name: "Live",
      //   note: "Production — please don't place real orders.",
      //   portals: [ ... ],
      // },
    ],
  },

  {
    id: "gaza40plus",
    name: "Gaza 40+",
    description: "Role-based platform with five distinct access levels, each with its own workflow and permissions.",
    tags: ["Full Stack", "RBAC"],
    projectLink: "https://portal.gaza40plus.co.uk/",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox accounts for each of the five roles.",
        portals: [
          {
            role: "Role 1 — Super Admin",
            url: "https://portal.gaza40plus.co.uk/",
            email: "admin@example.com",
            password: "AdminSaleem@1416",
            note: "Update with the real role name & permissions.",
          },
          {
            role: "Role 3 — Regional Admin",
            url: "https://portal.gaza40plus.co.uk/",
            email: "regional.uk@example.com",
            password: "RegionalAdminSaleem@1416",
            note: "",
          },
          {
            role: "Role 2 — Volunteers",
            url: "https://portal.gaza40plus.co.uk/",
            email: "volunteer@example.com",
            password: "MentorSaleem@1416",
            note: "",
          },
          {
            role: "Role 4 — Students",
            url: "https://portal.gaza40plus.co.uk/",
            email: "student@example.com",
            password: "Password123!",
            note: "",
          },
          
        ],
      },
    ],
  },
  {
    id: "Shaza Couple Platform",
    name: "Shaza Couple Platform",
    description: "To be added",
    tags: ["Full Stack", "AI", "RAG", "PWA"],
    projectLink: "https://shaza-sandbox.vercel.app/welcome",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox accounts for couples.",
        portals: [
          {
            role: "Couple Male Account",
            url: "https://shaza-sandbox.vercel.app/welcome",
            email: "shaamidreez@gmail.com",
            password: "Shaam@#1234",
            note: "To be added",
          },
          {
            role: "Couple Female Account",
            url: "https://shaza-sandbox.vercel.app/welcome",
            email: "laraib@allenhouse.ac.in",
            password: "hayat@#1234",
            note: "To be added",
          },
        ],
      },
    ],
  },
];
