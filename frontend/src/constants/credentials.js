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
    id: "Shaza Couple Platform",
    name: "Shaza Couple Platform",
    description: "A private real-time app for couples: WebRTC voice and video calls, a synced watch-together room, and an AI companion you can train on your own exported chats so it learns to text like your partner. There's also an AI mediator for arguments, built on a RAG pipeline over MongoDB vector search, and designed so one partner's private words never leak to the other.",
    tags: ["Full Stack", "AI", "RAG", "PWA"],
    projectLink: "https://shaza-sandbox.vercel.app/welcome",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox accounts for couples. try exploring each tab there is a lot to explore",
        portals: [
          {
            role: "Couple Male Account",
            url: "https://shaza-sandbox.vercel.app/welcome",
            email: "shaamidreez@gmail.com",
            password: "Shaam@#1234",
            note: "One side of the couple. Best experienced by logging into both accounts in two browsers, then starting a call or watch-together and chatting with the AI companion.",
          },
          {
            role: "Couple Female Account",
            url: "https://shaza-sandbox.vercel.app/welcome",
            email: "laraib@allenhouse.ac.in",
            password: "hayat@#1234",
            note: "The partner account. Open this in a second browser to see the real-time sync: shared calls, the watch-together room, and the mediator that keeps each side's private notes separate.",
          },
        ],
      },
    ],
  },
  {
    id: "Eudoro",
    name: "Eudoro",
    description: "Production Multi-vendor e-comm for customized products, eliminating manual workflow involving many platforms with scattered data — separate portals for admins, sellers, buyers and live monitoring.",
    tags: ["Full Stack", "E-commerce", "RBAC"],
    // Optional: a single "main" link for the project (shown as the big CTA).
    projectLink: "https://eudoro.art",
    codeLink: "",
    environments: [
      {
        name: "Testing",
        note: "Sandbox data try not to delete anything, but feel free to click around and explore.",
        portals: [
          {
            role: "User",
            url: "https://eudoro.art",
            email: "kaleem@astreait.com",
            password: "hayat@#1234",
            note: "Shopper experience: browse, cart, checkout, chat support, track order, badges. one can also create account",
          },
          {
            role: "Seller",
            url: "https://seller.eudoro.art",
            email: "shaamidreez@gmail.com",
            password: "Shaam@#1234",
            note: "Storefront management, products, inventory, orders, payouts, analytics, chat support.",
          },
          {
            role: "Admin",
            url: "https://admin.eudoro.art",
            email: "shaamidreez@gmail.com",
            password: "hayat@#1234",
            note: "Full dashboard: users, vendors, orders, payouts, analytics, settings, etc.",
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
            note: "Full platform access: all regions, users, applications, documents and the whole case lifecycle. Permissions are enforced on the server, not the token.",
          },
          {
            role: "Role 3 — Regional Admin",
            url: "https://portal.gaza40plus.co.uk/",
            email: "regional.uk@example.com",
            password: "RegionalAdminSaleem@1416",
            note: "Scoped to a single region: oversee the volunteers, students, applications and cases for that region only.",
          },
          {
            role: "Role 2 — Volunteers",
            url: "https://portal.gaza40plus.co.uk/",
            email: "volunteer@example.com",
            password: "MentorSaleem@1416",
            note: "Collaborate on assigned students: real-time chat, status updates, ticketing and document review.",
          },
          {
            role: "Role 4 — Students",
            url: "https://portal.gaza40plus.co.uk/",
            email: "student@example.com",
            password: "Password123!",
            note: "Student-facing view: onboarding, application tracking, document uploads and messages.",
          },
          
        ],
      },
    ],
  },
 
];
