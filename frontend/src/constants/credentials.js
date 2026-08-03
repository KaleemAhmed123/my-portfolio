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
    id: "udoro",
    name: "Udoro",
    description: "Multi-vendor e-commerce platform — separate portals for admins, sellers, buyers and live monitoring.",
    tags: ["Full Stack", "E-commerce"],
    // Optional: a single "main" link for the project (shown as the big CTA).
    projectLink: "https://udoro.com",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox data — safe to create/delete anything. Resets periodically.",
        portals: [
          {
            role: "Admin",
            url: "https://admin.udoro.com",
            email: "admin@demo.udoro.com",
            password: "Admin@123",
            note: "Full dashboard: users, vendors, orders, payouts.",
          },
          {
            role: "Seller",
            url: "https://sellers.udoro.com",
            email: "seller@demo.udoro.com",
            password: "Seller@123",
            note: "Storefront management, products, inventory.",
          },
          {
            role: "User",
            url: "https://udoro.com",
            email: "user@demo.udoro.com",
            password: "User@123",
            note: "Shopper experience: browse, cart, checkout.",
          },
          {
            role: "Monitoring",
            url: "https://monitoring.udoro.com",
            email: "monitor@demo.udoro.com",
            password: "Monitor@123",
            note: "System health, metrics & logs dashboard.",
          },
        ],
      },
      // When Udoro goes live, add another environment here, e.g.:
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
    projectLink: "https://gaza40plus.com",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox accounts for each of the five roles.",
        portals: [
          {
            role: "Role 1 — Super Admin",
            url: "https://gaza40plus.com/login",
            email: "superadmin@demo.com",
            password: "Super@123",
            note: "Update with the real role name & permissions.",
          },
          {
            role: "Role 2 — Manager",
            url: "https://gaza40plus.com/login",
            email: "manager@demo.com",
            password: "Manager@123",
            note: "",
          },
          {
            role: "Role 3 — Staff",
            url: "https://gaza40plus.com/login",
            email: "staff@demo.com",
            password: "Staff@123",
            note: "",
          },
          {
            role: "Role 4 — Partner",
            url: "https://gaza40plus.com/login",
            email: "partner@demo.com",
            password: "Partner@123",
            note: "",
          },
          {
            role: "Role 5 — Member",
            url: "https://gaza40plus.com/login",
            email: "member@demo.com",
            password: "Member@123",
            note: "",
          },
        ],
      },
    ],
  },
];
