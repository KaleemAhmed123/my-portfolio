// Eudoro case study.
// Sources, in precedence order:
//   1. Project-Details-Playbook/Eudoro/EUDORO-PLAYBOOK.md   (verified against source)
//   2. Project-Details-Playbook/Eudoro/EUDORO-CHATGPT-PLAYBOOK.md (deeper per service)
//   3. Project-Details-Playbook/Eudoro/EUDORO-ISSUE-TRACKER.md
// Where 1 and 2 disagree, 1 wins: it was re-verified against the monorepo.
//
// Block shapes, all tagged arrays so one renderer handles every tab:
//   ["lead", text]                        opening paragraph, larger
//   ["p", text]                           paragraph
//   ["list", title|null, [items]]         bullets, optional heading
//   ["pre", text]                         monospace diagram straight from the playbook
//   ["table", [heads], [[cells]]]         scrolls sideways on small screens
//   ["cards", [{ t, body } | { t, rows }] rows = [[label, text], ...]
//   ["note", text]                        callout
//   ["stats", [[value, label]]]           figure strip

const eudoro = {
  slug: "eudoro",
  // matched case-insensitively against the Sanity work title
  match: ["eudoro"],
  title: "Eudoro",
  tagline:
    "A multi-vendor marketplace for personalized products, where the customization requirements are part of checkout instead of a chat thread.",
  role: "Sole engineer",
  status: "Live",
  liveUrl: "https://eudoro.art",
  credentialsKey: "Eudoro",
  stack: ["TypeScript", "Express", "Next.js 15", "MongoDB", "Prisma", "RabbitMQ", "Redis", "Docker", "AWS"],
  stats: [
    ["12", "backend services"],
    ["3", "Next.js apps"],
    ["29", "Prisma models"],
    ["78", "test files"],
    ["8+", "months, solo"],
  ],

  tabs: [
    /* ---------------------------------------------------------------- PRODUCT */
    {
      id: "overview",
      label: "Overview",
      group: "The Product",
      blocks: [
        ["lead",
          "Eudoro is a multi-vendor marketplace for personalized products. Items that do not exist until a buyer supplies the thing that makes them personal: a photo, a name, a date, an engraving, a set of colours."],
        ["p",
          "Structurally it is a commerce platform. Buyers, sellers, shops, catalogues, carts, payments, shipments, wallets, payouts, admin oversight. That part is familiar."],
        ["p",
          "What makes it a different product is the customization engine. On an ordinary marketplace a product is a fixed SKU and the only variables are quantity and maybe size. On Eudoro a product carries a seller-defined schema of customization fields, and a purchase is not valid until the buyer has satisfied that schema. The customization data travels with the order all the way to the seller's production queue and into the order's permanent history."],
        ["note",
          "Everything else in the system exists to make that one flow work end to end without anyone falling back to WhatsApp."],
        ["stats", [
          ["12", "backend services"],
          ["3", "Next.js apps"],
          ["29", "Prisma models"],
          ["78", "test files"],
          ["8+", "months, solo"],
        ]],
        ["note",
          "The whole product comes out of one observation, which the Problem tab tells properly: in this trade, the person with the least information is the one who has to start every conversation. Eudoro turns that around. The seller writes down once what a product needs, and the platform does the asking, every time, for free."],
        ["p",
          "It is a marketplace rather than a single-seller store because the problem is the seller's problem, and there are a lot of sellers with it. Multi-vendor is also what forces most of the actual engineering. A cart can hold items from several shops, so one payment has to fan out into per-seller obligations. Money cannot go straight to the seller, because the platform has to take it, hold it, split it, track a commission and release it on a condition. Almost everything worth talking about technically, meaning order splitting, the wallet, payouts and seller verification, is downstream of that one decision."],
      ],
    },

    {
      id: "problem",
      label: "Problem",
      group: "The Product",
      blocks: [
        ["lead",
          "I found this problem by being on the wrong end of it. I wanted to buy something customized, and the way you do that is you find the artist on Instagram and open a DM. That chat window turned out to be the entire commerce system."],
        ["p",
          "It went the way it always goes. I send a photo. A day later they tell me the resolution is too low and ask for a better one. I send the name I want on it. They ask how it should be spelled, what colour, where on the product, and whether I want it before a particular date. Four exchanges in and we have not talked about money yet."],
        ["p",
          "What stuck with me was not that it was slow. It was noticing that I could not have moved any faster than I did, because I had no way of knowing what they needed until they asked me. Every single round trip had to be started by them. And they were not doing this once, they were doing it with every customer at the same time, in an app that has no concept of an order."],
        ["note",
          "That is the whole problem in one sentence: the person with the least information is the one who has to start every conversation. Everything technical in this project is a consequence of moving that job from the seller to a schema."],
        ["p",
          "Once you see it from their side it gets worse. Their day is a chat app with forty open threads, and each thread is an order in some undefined state. Somewhere in there is a photo that belongs to a mug and a spelling that belongs to a keychain, and the only index is scrolling. Money arrives as a UPI notification with a name that may or may not match the person in the thread. Then the address gets typed into Shiprocket by hand, one character at a time, for every order."],
        ["p",
          "None of that is the work. The work is making the thing. All of it is overhead that pulls them away from the craft, and here is the part that actually bothered me: it scales linearly with success. Ten orders a week is manageable. Forty is not, and forty is what happens when they get good. Their own workflow punishes them for growing, so the ceiling on their business is not demand or skill, it is how many DM threads one person can hold in their head."],
        ["p",
          "And none of the tools involved know about each other. There is no system here, just a chain of apps with a human copying between them."],
        ["pre",
`Instagram (discovery)
   -> WhatsApp / DM (requirements gathering, negotiation)
      -> UPI / payment link (money, with no link to the conversation)
         -> notebook or memory (order management)
            -> production
               -> Shiprocket, entered by hand (shipping)
                  -> DM again (tracking updates)`],
        ["p",
          "Every arrow in that chain is a manual copy-paste by the seller, and every box has no memory of the previous one. The photo in step two does not travel to step five. The payment in step three does not know which conversation it belongs to. When the buyer asks \"where is my order\", the only place that answer exists is in a person's memory."],
        ["table", ["Seller problem", "What it actually costs"], [
          ["Requirements arrive incomplete", "Multiple round trips per order before work can start"],
          ["No structure to customization data", "Seller must remember which asset belongs to which buyer"],
          ["No order record", "No history, no status, no way to answer \"where is my order\""],
          ["Payment disconnected from order", "Reconciling who paid for what is manual"],
          ["Manual shipping entry", "Address re-typed into Shiprocket per order, transcription errors"],
          ["Overhead scales with success", "More orders means proportionally more admin, not more craft time"],
        ]],
        ["table", ["Buyer problem", "What it actually costs"], [
          ["Does not know what to provide", "Cannot self-serve, waits on the seller to ask"],
          ["Advance payment to a stranger", "Pure trust, no escrow, no recourse"],
          ["No order state", "\"Is it made yet?\" is a question you have to ask a human"],
          ["Sends personal photos over DM", "No sense of where that data goes"],
          ["No unified experience", "Each seller's process is different and improvised"],
        ]],
        ["p",
          "The buyer's half is worth sitting with too, because it is the reason the money design turned out the way it did. You are sending a photograph of someone you love to a stranger's phone number, then transferring money to them in advance, with nothing in return but a promise in a chat window. There is no escrow, no order page, no way to check. If it goes wrong your only recourse is to keep messaging the same person who has your money."],
        ["p",
          "Most people do it anyway, because the work is good and they want the thing. But that trust is being extended by the buyer every single time, and nothing in the workflow earns it. That is what the wallet and the delivery-gated payout exist to fix, and it is why they are not a nice-to-have feature bolted on the side."],
      ],
    },

    {
      id: "solution",
      label: "Solution",
      group: "The Product",
      blocks: [
        ["lead",
          "The transformation is one sentence: the marketplace holds the state that used to live in a chat log and in the seller's head."],
        ["pre",
`BEFORE   Instagram -> WhatsApp -> payment link -> memory -> Shiprocket by hand

AFTER    one marketplace that holds the state previously kept
         in a chat log and in the seller's head`],
        ["p",
          "That sounds abstract, so the rest of this is the long version: what actually got built, for whom, and which conversation each piece deletes. It is written as three journeys, because that is how it was built. The buyer's path, the seller's path, and the admin's path all had to work before any of it was worth anything."],
        ["list", "What follows", [
          "01 · The engine underneath all of it",
          "02 · The buyer, from browsing to the doorstep",
          "03 · The seller, from an empty shop to getting paid",
          "04 · The admin, and the parts a marketplace cannot automate yet",
          "05 · The part nobody sees",
        ]],

        ["h", "01", "The engine underneath all of it"],
        ["p",
          "Every other feature on this page is downstream of one idea, so it is worth being precise about it before anything else."],
        ["p",
          "On a normal store, a product is a fixed thing. A mug is a mug. The only questions are how many and which size, and those are dropdowns someone decided on years ago. On Eudoro a product carries a schema that its own seller wrote, and a purchase is not valid until a buyer has satisfied it."],
        ["pre",
`SELLER writes the schema            BUYER fills it in

products                            order_item_customization
  customizationFields[]      <-->     fieldKey  ("photo")
    fieldKey  "photo"                 value     <the upload>
    fieldType image
    required  true
    rules     min resolution
    sequence  1
    priceModifier  -`],
        ["p",
          "fieldKey is the join. That is the entire mechanism, and it is the reason this is a different product rather than another storefront. The seller is not choosing from a list of customization options I thought of. They are describing their own product, in their own terms, and the platform enforces whatever they describe."],
        ["p",
          "The field types cover what this trade actually needs. Text for a name, a quote, a message, a dedication. Image for the photo the whole gift is built around. Colour for a finish. File for anything else. And boolean for the things that are a yes or no with a price attached, like gift wrapping. Each field carries whether it is required, its validation rules, the order it appears in the form, and optionally a price modifier, so a wrapped mug costs more than an unwrapped one without the seller maintaining two products."],
        ["note",
          "Building it this way was the decision that made everything else harder and the product better. A fixed set of customization options would have been a week of work. A seller-authored schema meant the validation had to be generic, the cart had to handle identity it could not predict, and the database had to hold shapes I would never see. It also meant a seller can sell something I never imagined."],
        ["p",
          "One more detail that only matters once you think about fraud. Validation runs in two places: live over HTTP while the buyer fills the form, so the error appears where the mistake was made, and again over RabbitMQ during checkout re-validation, so a browser tab left open for two days cannot smuggle a stale or edited submission past the payment step."],

        ["h", "02", "The buyer, from browsing to the doorstep"],
        ["p",
          "The buyer's job used to be to open a DM and wait to be told what was needed. Now it is to fill in a form that already knows."],
        ["cards", [
          { t: "Finding something worth buying",
            body: "Shops, search, filtering and category navigation, with shop and product pages server-rendered so a seller's work is actually indexable. Reviews sit on the shop, so a buyer deciding whether to trust a stranger with a photograph of their family has something to go on besides a follower count. Wishlist and offers for the ones they are not ready to buy yet." },
          { t: "The form that replaces the DM thread",
            body: "The product page shows exactly what this item needs, in the order the seller chose, with their own instructions attached. Upload the photo. Type the name, the quote, the message. Choose whether it is a gift, whether it should be wrapped, whether a letter goes in the box. Every field is validated as it is filled, against rules the seller wrote, so nobody finds out two days later that the image was too small." },
          { t: "A cart that understands two of the same thing are not the same thing",
            body: "Adding the same mug twice with different names on it produces two lines, because they are two different physical objects that have to be made separately. Adding it twice with the same name merges into one line with quantity two. The identity is derived from the product, the selected options and the customization payload together, with the keys sorted first so it does not matter what order the form was filled in." },
          { t: "A checkout that does not trust the browser",
            body: "At checkout the server throws away every price-relevant field the client sent and recomputes: real current price, real stock, real commission, and the coupon's actual value looked up from the code rather than the discount amount the client claims. Editing the cart in devtools changes what you see and nothing about what you are charged." },
          { t: "Paying a stranger, safely",
            body: "Payment goes through Razorpay for a server-computed amount. The platform holds the money. The seller does not get it when you pay, they get it after the order is confirmed delivered. That hold is the single thing that makes buying from an artist you found on the internet a reasonable act." },
          { t: "Knowing where the order is without asking anyone",
            body: "An order page with a real status that changes because an event changed it. Carrier tracking webhooks flow back into the order, and notifications go out on the transitions that matter. \"Is it made yet\" stops being a question you ask a human." },
          { t: "Talking to the seller when you genuinely need to",
            body: "Real-time chat, scoped to the shop and the order, so the conversation has context instead of being a bare DM. Conversations close themselves after a grace period. The point was never to remove the human contact, it was to remove the forty messages that were only ever there to collect data a form could have collected." },
        ]],
        ["p",
          "There is also a small recognition layer, badges on the buyer side, which is the least technically interesting thing here and one of the more effective. People come back to a place that acknowledges they were there."],
        ["video", "/clips/eudoro-user-flow.mp4",
          "The buyer's path end to end: finding a product, filling the seller's customization fields, the cart keeping two versions of the same item apart, checkout, and tracking."],

        ["h", "03", "The seller, from an empty shop to getting paid"],
        ["p",
          "This is the side the product was actually built for, and it is where most of the work went."],
        ["cards", [
          { t: "Getting in the door",
            rows: [
              ["Onboarding", "OTP-verified registration, then GST verification, then an admin actually looking at the account before it can sell. Slower than self-serve on purpose. A marketplace that lets anyone take money from strangers on day one is a marketplace with a fraud problem by month two."],
              ["Setting up shop", "Shop profile, catalogue, settings. The seller owns their shop and their products outright, which is what makes it a marketplace rather than a shared storefront."],
            ] },
          { t: "Describing a product properly, once",
            rows: [
              ["The normal part", "Name, base price, images, stock, category."],
              ["The part that matters", "The customization schema. Take a mug. The seller adds a photo field and marks it required, sets a minimum resolution so nobody sends a screenshot of a screenshot, and writes the instruction that appears next to it: which part of the photo ends up on the front. Then a text field for the name with a character limit that matches what physically fits. Then gift wrap as a yes-or-no with fifty rupees attached."],
              ["What it replaces", "Every message that seller has ever sent asking for a better photo. They wrote the requirement down once and the platform asks on their behalf, forever, for every buyer, at the moment the mistake is made rather than two days later."],
            ] },
          { t: "An order that arrives ready to make",
            rows: [
              ["Notification", "A new order fires an event and the seller is notified. No refreshing a chat app to see if anything came in."],
              ["What is in it", "The buyer's submission is already attached, already validated against the seller's own rules, and stored permanently with the order item rather than living in a chat scroll. The photo that belongs to this mug is on this order and cannot be confused with the photo on that keychain."],
              ["Multi-seller orders", "If the buyer's cart held items from three shops, that one payment became three separate orders, one per shop, committed all-or-nothing. Each seller sees only their own."],
            ] },
          { t: "Accept, and the logistics happen without you",
            rows: [
              ["Accepting", "The seller accepts the order when they are ready to make it. That acceptance is what triggers everything downstream."],
              ["Shipping", "The platform creates the Shiprocket shipment automatically and the AWB is generated as its own recoverable step. The seller picks the pickup, the courier arrives, and the package goes. Nobody opens another tab and re-types an address they copied out of a message."],
              ["Tracking", "Carrier webhooks come back in and update the order, which notifies the buyer. The seller stops being the tracking API."],
            ] },
          { t: "Getting paid, which is the part I rewrote the most",
            rows: [
              ["The credit", "The wallet is credited when the order is confirmed delivered, never when the buyer pays. This is the rule that makes the whole trust model work, and it is also what turns the wallet into a state machine instead of a running total."],
              ["Balance and lock", "A seller has a total balance and a locked balance. Requesting a payout locks the amount atomically, so two requests fired at the same moment cannot both reserve the same money. That guard is a conditional update rather than a read-then-write, which is the difference between correct and only-looks-correct."],
              ["The payout lifecycle", "Pending, then Approved, then Paid, with rejection and failure paths and an audit record on every transition. A failed payout goes back to Approved and stays retryable rather than vanishing."],
              ["Reversal", "If a delivered order later comes back as returned, RTO or lost, the credit is reversed through a single idempotent path that is safe whether the return arrives before or after the credit existed."],
            ] },
          { t: "Running the business",
            body: "Order analytics on their own sales, chat with their buyers scoped per order, and notifications on the events that need a human: a new order, a delivery, a payout moving." },
        ]],
        ["video", "/clips/eudoro-seller-flow.mp4",
          "The seller's path: building a product and authoring its customization schema, an order arriving already validated, accepting it, and the wallet and payout lifecycle."],
        ["note",
          "Payout approval is deliberately manual for this first version. A human at the platform looks at each one before money leaves. That is slower than it could be, and for an MVP moving real money between strangers it is the correct trade: the automation I would need to trust is the automation I have not proven yet."],

        ["h", "04", "The admin, and the parts a marketplace cannot automate yet"],
        ["p",
          "A two-sided marketplace has a third side, and pretending otherwise is how you end up with a fraud problem and no tooling to see it. The admin console is the least glamorous of the three apps and the one that makes the other two safe."],
        ["cards", [
          { t: "Deciding who gets to sell",
            body: "Seller verification with GST checks. An account can register on its own, but it cannot take a stranger's money until a person has approved it." },
          { t: "Approving money before it moves",
            body: "Every payout passes through an admin. Approve it, reject it with a reason, or mark it failed and let it stay retryable. Each transition writes an audit record, so the question \"who released this and when\" always has an answer." },
          { t: "Moderation and oversight",
            body: "Platform-wide visibility across sellers, shops, products and orders, so a bad listing, a disputed order or a seller behaving badly is something a person can actually see and act on rather than something that surfaces when a buyer complains publicly." },
          { t: "Alerts for the things that should be impossible",
            body: "A scheduled reconciliation job asserts states that cannot exist under correct behaviour, such as a locked balance exceeding a total balance, or money sitting too long in a pre-payout state. When it finds one it alerts an admin. Correctness on the money paths is monitored rather than assumed." },
          { t: "The platform's own books",
            body: "Commission and platform earnings recorded per order as its own concern, so what the platform made is a record rather than a calculation someone runs at the end of the month." },
        ]],

        ["h", "05", "The part nobody sees"],
        ["p",
          "Three of the things above are three separate applications, and that is a decision rather than an accident. The storefront is public, needs to be indexed, and has to be fast for someone who has never visited before. The seller dashboard is dense, private, and should never appear in a search result. The admin console is an internal tool with a third set of concerns again. Building one app with role switching would mean every page carrying the union of all three, and it would mean shipping admin code to every buyer's browser and relying on a conditional to hide it."],
        ["cards", [
          { t: "Server state and client state are not the same thing",
            body: "React Query holds everything that lives on the server: products, orders, shops, payout history. The hard problems there are caching, invalidation and refetching, not storing values. Zustand holds the state that genuinely is not server state, chiefly the cart, which exists in the browser long before it reaches the server and is read from several places at once." },
          { t: "Server components take the short route",
            body: "A client component has to call the public domain, because a browser cannot resolve a Docker service name. A server component rendering inside the network can call the gateway directly. Using the public URL there would send the request out to the internet, through Nginx and TLS, and back to a service that was two hops away the whole time." },
          { t: "The cart identity code",
            body: "Sorting the customization keys before serialising them into the cart item ID is one line and it is load-bearing. JavaScript object key order follows insertion order, so without it the same customization typed in a different sequence produces a different identity, and the buyer stares at two identical lines in their cart wondering what went wrong." },
        ]],
        ["p",
          "None of this makes the seller better at their craft. That was never the point. The measure I care about is whether the fortieth order in a week costs them the same amount of admin as the fourth, because that is the thing the old workflow could never do, and it is why their ceiling used to be how many chat threads one person could hold in their head."],
        ["note",
          "This took more than eight months, alone. Most of that was not writing features. It was the parts that only matter when they are wrong: making the money paths safe to run twice, working out what a cart item's identity actually is, deciding what the platform should refuse to do automatically. The features above are the visible half."],
      ],
    },

    {
      id: "features",
      label: "Features",
      group: "The Product",
      blocks: [
        ["p",
          "The Solution tab tells this as a story. This one is the reference: what exists, grouped, with the mechanic rather than the headline. If a line sounds like it is doing something specific, it is."],

        ["list", "Marketplace and discovery", [
          "Multi-vendor shops. A seller owns their shop and their catalogue outright, and a buyer's cart can hold items from several of them at once.",
          "Product browsing, keyword search, filtering and category navigation.",
          "Shop and product pages are server-rendered, because a seller's work is worth indexing and a client-rendered storefront is invisible to search.",
          "Shop reviews, so a buyer deciding whether to send a photograph of their family to a stranger has something to go on.",
          "Wishlist for the things they are not ready to buy, and offers surfaced on the storefront.",
          "Buyer-side badges as a light recognition layer.",
        ]],

        ["list", "Customization engine", [
          "Per-product field templates, authored by the seller rather than chosen from a list I decided on.",
          "Field types covering text, image, colour, file and boolean. A name, a quote, a message, a dedication, the photo the gift is built around, a finish, or a yes-or-no like gift wrapping.",
          "Each field carries a required flag, its own validation rules, a display sequence so the form reads in the order the seller intended, and an optional price modifier so wrapped costs more than unwrapped without maintaining two products.",
          "Per-product customization instructions and preview support, so the seller can explain which part of the photo ends up on the front.",
          "Validation runs server-side over HTTP while the buyer fills the form, so the error appears where the mistake was made.",
          "It runs again over RabbitMQ during checkout re-validation, in a request-and-reply pattern rather than fire-and-forget, so a browser tab left open for two days cannot push a stale or edited submission through.",
          "The buyer's submission is persisted with the order item as a permanent record, joined to the seller's template by fieldKey. The photo that belongs to this mug stays attached to this mug.",
        ]],

        ["list", "Cart and pricing", [
          "Cart item identity is derived from the product, the selected options and the customization payload together, not from the product ID.",
          "Those keys are sorted before serialisation. JavaScript object key order follows insertion order, so without sorting the same customization typed in a different sequence produces a different line and the buyer sees two of what is visibly one item.",
          "Same product, different engraving, two lines. Same product, same engraving, one line at quantity two. That is correct, because they are two different physical objects that have to be made separately.",
          "A client-side validateCart pass drops structurally invalid entries. That is for user experience, clearing stale items, and is explicitly not a security control.",
          "At checkout the server discards every price-relevant field the client sent and recomputes from the database: current price, real stock, commission, and the coupon's actual value. The browser cart is UI state, the server cart is the contract.",
        ]],

        ["list", "Discounts and coupons", [
          "The client sends a coupon code. It never sends a discount amount.",
          "The server looks up what that code is actually worth and applies it, so editing the request changes nothing about what you are charged.",
          "Coupons are re-validated at checkout the same way prices, stock and customization are, rather than being trusted from the session that created the cart.",
          "Seller-authored offers on the storefront, and gift wrapping priced through the customization field's own price modifier rather than as a separate product.",
        ]],

        ["list", "Payments", [
          "Razorpay integration where the payment session is always created for a server-computed amount.",
          "Webhooks verified by HMAC over the raw request body, compared in constant time so signature verification cannot be attacked through timing.",
          "payment-service holds no database connection at all. It owns the conversation with Razorpay and emits events, and order state lives where it belongs.",
          "Refunds carry idempotency keys, so a retried refund does not become a second refund.",
        ]],

        ["list", "Orders", [
          "Orders are never created inside the checkout request. A verified payment publishes an event and order-service consumes it, so a database failure can never produce a charged customer with no order.",
          "Order creation is idempotent, keyed on the Razorpay payment ID, because at-least-once delivery guarantees the message will eventually arrive twice.",
          "Multi-seller splitting: one payment produces one order per shop, and the whole batch, every order and every customization record, commits atomically. A buyer is never charged while one seller silently receives nothing.",
          "Addresses are snapshotted onto the order at checkout and never re-read, so editing an address book entry later cannot change where a shipped order was going.",
          "Full status lifecycle with an explicit seller acceptance step, rather than an order that is assumed accepted the moment it is paid for.",
          "Seller-facing order analytics served from order-service, covering their own sales rather than the platform's.",
        ]],

        ["list", "Shipping and delivery", [
          "Shiprocket sits behind an opossum circuit breaker in its own service, so its downtime degrades shipment creation and cannot touch checkout or orders.",
          "Accepting an order creates the shipment automatically. Nobody re-types an address into another tab.",
          "AWB generation is a discrete step that can be recovered on its own, rather than being bundled into shipment creation and lost with it.",
          "The breaker's fallback is validated for real carrier identifiers. Their absence is treated as a creation failure, so an outage cannot produce orders the system believes are shipped.",
          "Carrier webhooks map into order status and fan out to the buyer's notifications and, where relevant, to the wallet.",
        ]],

        ["list", "Wallet and payouts", [
          "The seller's wallet is credited when delivery is confirmed, never when the buyer pays. That hold is what makes paying a stranger in advance reasonable.",
          "A seller has a total balance and a locked balance, tracked separately.",
          "Requesting a payout locks the amount through a conditional atomic update that folds the eligibility check into the write. Two requests fired at the same instant cannot both reserve the same money, because the loser matches zero rows and is refused.",
          "Withdrawals and debits are floor-guarded against taking the balance negative.",
          "Involuntary losses are deliberately exempt from that guard. A seller can go into debt on a chargeback or a lost parcel, netted out against future earnings, rather than the platform absorbing it.",
          "Payout lifecycle of Pending, then Approved, then Paid, with rejection and failure paths. A failed payout returns to Approved and stays retryable instead of vanishing.",
          "Every transition writes an audit record, so \"who released this and when\" always has an answer.",
          "Credit reversal on returned, RTO or lost orders through a single idempotent path that no-ops when no credit exists, so it is safe whether the return arrives before or after the credit.",
          "A scheduled reconciliation job asserts states that are impossible under correct behaviour, such as a locked balance exceeding a total balance or money stale in a pre-payout state, and alerts an admin when it finds one.",
        ]],

        ["list", "Admin, verification and moderation", [
          "Seller verification with GST checks. An account can register itself but cannot take a stranger's money until a person has approved it.",
          "Payout approval is manual by design for this first version. A human looks at every movement of money before it leaves.",
          "Platform-wide oversight across sellers, shops, products and orders, with product and seller moderation.",
          "Audit records on every money-affecting admin action.",
          "Critical system alerting, so the reconciliation tripwires reach a person rather than a log file.",
          "Platform earnings and commission recorded per order as their own concern, rather than being recalculated at month end.",
        ]],

        ["list", "Communication and notifications", [
          "Real-time buyer to seller chat over Socket.IO, scoped to a shop and an order so the conversation carries context instead of being a bare DM.",
          "Conversation lifecycle with auto-close and grace-period deletion, handled by chat-service rather than by a cron job in another service reaching across a boundary.",
          "Event-driven notifications across order, delivery, payout and wallet events. A service publishes what happened and does not know or care who is listening.",
          "Email delivery through Nodemailer with EJS templates, owned by notification-service. Auth owns OTP truth, notification owns message delivery.",
        ]],

        ["list", "Authentication and accounts", [
          "OTP-verified registration for both buyers and sellers, with the OTP held in Redis under a TTL so expiry needs no cleanup job.",
          "OTP anti-abuse through Redis-backed cooldowns between requests, a failed-attempt counter, a temporary lock after repeated failures, and a spam lock after excessive requests.",
          "Short-lived access tokens paired with longer-lived refresh tokens, both in HTTP-only cookies so they are unreachable from JavaScript, with a centralised helper keeping the flags consistent.",
          "Downstream services verify the JWT themselves rather than calling auth-service per request, which would make it a synchronous dependency of everything and a single point of failure for the platform.",
          "Role-based middleware shared across every service, so buyer, seller and admin checks behave identically rather than being reimplemented per controller.",
          "A separate class of internal routes under internal-service authentication, which the gateway refuses from outside with a 403.",
          "GST verification for seller onboarding, and a buyer address book.",
        ]],

        ["list", "Platform, observability and reliability", [
          "A deliberately thin API gateway holding no database and no business logic. Routing, CORS, rate limiting, correlation IDs and upstream timeout policy, and nothing else.",
          "Tiered rate limiting with counters in Redis, so limits hold across gateway instances instead of per process, and authentication endpoints are stricter than the rest.",
          "A configurable upstream timeout, defaulting to 30 seconds, so one hung service cannot stall the platform.",
          "Correlation IDs generated at the edge and forwarded through every service, so one checkout is traceable across the five processes it touches.",
          "Prometheus scraping per-service metrics, Grafana dashboards, Loki and Promtail for logs. Log collection does not depend on application code being healthy.",
          "Health checks and per-service metrics endpoints, with startup ordering gated on dependencies actually being healthy.",
          "Services fail fast at boot on missing or invalid configuration rather than on the first request that needs it.",
          "78 test files across services and packages, Playwright UI smoke specs, and purpose-built integration, event and money-reconciliation scripts.",
        ]],

        ["list", "Partially implemented", [
          "Internal SSR routing. Server components calling the gateway by its internal Docker address is the intended pattern, applied today on the two SEO-critical routes rather than uniformly.",
          "Shared component library. packages/ is used thoroughly for backend concerns, while frontend sharing is partial and some components are still duplicated per app.",
          "Distributed tracing. OpenTelemetry is wired in alongside metrics and logs, but tracing is not yet the primary debugging path.",
        ]],

        ["list", "Planned", [
          "Further physical database separation per service. The per-service client factory and connection resolution already exist.",
          "A transactional outbox, so a published event cannot be lost between a state change and the broker.",
          "Platform-wide analytics as its own service. Seller-facing order analytics already work, the separate service is scaffolded and not deployed.",
          "Customization template versioning, pinning order items to the schema version they were created against.",
        ]],
      ],
    },

    {
      id: "role",
      label: "My Role",
      group: "The Product",
      blocks: [
        ["lead",
          "I designed and built the backend architecture and worked across the full stack. Solo, from first commit to deploy."],
        ["p",
          "This was built to design and operate a system with real production concerns, not to demonstrate a framework. Every service, every frontend, the schema, the infrastructure and the deployment are mine."],
        ["table", ["Area", "What I built"], [
          ["System architecture", "Service decomposition and boundaries, ownership rules, the synchronous and asynchronous split, and the event-driven order pipeline."],
          ["Backend", "Twelve Express services in an Nx and pnpm monorepo: gateway, auth, seller, product, order, payment, delivery, notification, chat, payout-wallet and admin, plus shared packages for middleware, messaging, error handling, metrics and database access."],
          ["Frontend", "Three Next.js 15 App Router apps (buyer storefront, seller dashboard, admin console) with React Query for server state and Zustand for client state."],
          ["Database", "A 29-model Prisma schema on MongoDB, including the customization template and submission models the product is built around."],
          ["Events", "RabbitMQ chains for order creation, fulfilment, notifications and wallet operations, with idempotent consumers and retry handling on every money path."],
          ["Payments", "Razorpay, server-authoritative pricing, HMAC webhook verification, refunds, and the payment-to-order event boundary."],
          ["Shipping", "Shiprocket behind a circuit breaker, with shipment creation, AWB generation and webhook-driven tracking."],
          ["Money", "The seller ledger, its concurrency control, the payout state machine, and scheduled reconciliation."],
          ["Auth", "OTP flows, cookie sessions, role-based access control, and internal service-to-service authentication."],
          ["Real-time", "Socket.IO chat with conversation lifecycle management."],
          ["Infrastructure", "Docker Compose, Nginx reverse proxy and TLS, deployment to a single EC2 instance with tiered per-service resource limits."],
          ["Observability", "Prometheus metrics, Grafana dashboards, Loki log aggregation, correlation ID propagation."],
          ["Testing", "78 test files, Playwright UI smoke specs, and purpose-built integration, event and money-reconciliation check scripts."],
        ]],
        ["p",
          "It did not start in the shape it is in now. The honest evolution is worth stating, because the interesting decisions are the ones that changed."],
        ["cards", [
          { t: "1. Monolith-shaped start",
            body: "A single Prisma schema and a shared database client. Traces are still visible: the legacy root prisma singleton still exists alongside the newer per-service client factory." },
          { t: "2. Split into services along domain lines",
            body: "Auth, product, order, payment and the rest became separate Express applications behind a gateway." },
          { t: "3. Synchronous order creation became asynchronous",
            body: "Originally the checkout request created the order inline. It now happens on the payment.succeeded event. This is the single most important architectural change in the project." },
          { t: "4. A dedicated logger-service was built, then deleted",
            body: "Replaced by Prometheus, Grafana, Loki and Promtail. Deleting working code I had written was harder than adding more, and it was still the right call." },
          { t: "5. Money-path hardening",
            body: "An audit pass found a TOCTOU race in the wallet lock and an unguarded balance decrement. Both were fixed with conditional atomic updates." },
        ]],
      ],
    },

    {
      id: "try-it",
      label: "Try It",
      group: "The Product",
      blocks: [
        ["lead",
          "The platform is live and you can sign in as a buyer, a seller or an admin. Reading about a customization engine is much less convincing than watching it refuse your checkout."],
        ["table", ["Persona", "App", "Port", "What they do"], [
          ["Buyer", "user-ui", "3000", "Browse shops, customize products, checkout, track orders, chat with sellers"],
          ["Seller", "seller-ui", "3001", "Onboard, define products and their customization schemas, accept orders, manage shipments, request payouts"],
          ["Admin", "admin-ui", "3002", "Verify sellers, oversee orders, approve payouts, monitor platform health"],
        ]],
        ["list", "Worth clicking through, in this order", [
          "Open any product with customization fields and try to check out without filling them. The server refuses, not the form.",
          "Add the same product twice with different engraving text. It becomes two line items. Add it twice with identical text and it merges.",
          "As a seller, define a new product with a required image field and a text field with a max length. Then buy it as a buyer and watch the validation come from the schema you just wrote.",
          "As a seller, accept an order. The Shiprocket shipment is created by the platform, not typed in by hand.",
          "As a seller, check the wallet after a delivery is confirmed. The credit does not appear at payment time, which is the whole point.",
          "As an admin, walk a payout from Pending to Approved to Paid and watch the audit record appear at each transition.",
        ]],
        ["note",
          "Test logins for all three roles are on the credentials page. They are shared accounts, so expect other people's test data in there."],
      ],
    },

    /* ------------------------------------------------------------ ENGINEERING */
    {
      id: "architecture",
      label: "Architecture",
      group: "The Engineering",
      diagramDebt: true,
      blocks: [
        ["lead",
          "A pragmatic microservices architecture. Services are independently containerized and deployable, communication is split between synchronous REST and asynchronous RabbitMQ events, and individual services can be scaled horizontally on their own. The system deliberately shares some infrastructure and data access for simplicity, while maintaining logical service ownership boundaries."],
        ["pre",
`   user-ui :3000        seller-ui :3001        admin-ui :3002
        \\                     |                      /
         --------------  Nginx (TLS, proxy)  --------------
                              |
                     api-gateway :8080
             CORS . rate limiting . correlation IDs . routing
                              |
   +------+------+------+-----+-----+------+------+------+
  auth  product seller order payment delivery notification
            chat    payout-wallet    admin
   +------+------+------+-----+-----+------+------+------+
                              |
              +---------------+---------------+
        MongoDB Atlas       Redis          RabbitMQ
        (Prisma ORM)   (sessions, OTP,   (async events)
                        rate limits,
                        job queue)
                              |
              Razorpay . Shiprocket . ImageKit . SMTP

     Prometheus . Grafana . Loki . Promtail`],
        ["p",
          "A single request crosses a fixed set of edge concerns before it ever reaches a service. The gateway holds no database connection and no business logic, so the list below is the entire surface it adds."],
        ["pre",
`Browser
   |  HTTPS
   v
Nginx
   |
   v
API Gateway
   |
   +-- Helmet
   +-- CORS
   +-- Morgan
   +-- Cookies
   +-- Correlation ID
   +-- Metrics
   +-- Rate limiting
   +-- Internal-route protection
   |
   v
Path router
   |
   v
Target microservice`],
        ["p",
          "The split between synchronous and asynchronous communication is the spine of the architecture, and the rule is a single sentence: synchronous when the caller needs the answer to make its next decision, asynchronous when the caller's job is finished and what happens next is somebody else's responsibility."],
        ["table", ["Synchronous call", "Why it must be synchronous"], [
          ["Frontend to gateway to any service", "The user is waiting for a response"],
          ["payment-service to product-service", "Cart re-validation before creating a payment session. You cannot charge someone before confirming price and stock"],
          ["payment-service to order-service", "Order lookups during payment handling"],
          ["delivery-service to Shiprocket", "Shipment creation needs the AWB number back"],
          ["Any service to auth verification", "The request cannot be authorised later"],
        ]],
        ["table", ["Event", "Why it must be asynchronous"], [
          ["payment.succeeded to order creation", "The payment is already final. Order creation must not be able to fail the payment"],
          ["orders.order.created to notifications, wallet, admin earnings", "Three unrelated side effects, none of which should delay the others or the order"],
          ["orders.order.accepted to Shiprocket shipment", "Shiprocket is a flaky third party. Its downtime must not block order acceptance"],
          ["Delivery and tracking updates to order projection", "Webhook-driven, arrives whenever the carrier says so"],
          ["Payout and wallet events to notifications", "Pure side effect"],
        ]],
        ["cards", [
          { t: "Payment and order creation are deliberately decoupled",
            body: "Checkout creates a verified payment. An asynchronous event creates the order. Taking money is irreversible, so it is kept as small as possible, and everything retryable lives outside it. If order creation fails, the message is retried and the payment was never at risk. That inversion, payment first and order as a consequence, is the single most important design decision in the system." },
          { t: "Money is released on delivery, not on payment",
            body: "The wallet is credited when the order is confirmed delivered. That hold is the platform's core value to a buyer paying in advance, and it makes the wallet a state machine rather than a counter." },
          { t: "Third-party failure is contained",
            body: "Shiprocket sits behind a circuit breaker in its own service. When it is down, shipment creation degrades and retries. Checkout and orders are unaffected." },
          { t: "The gateway is deliberately thin",
            body: "It holds no database connection and no business logic. Only routing, CORS, rate limiting, correlation IDs and upstream timeout policy. It fronts everything, so the less it does, the fewer ways the platform can fail." },
          { t: "One monorepo, shared contracts",
            body: "Event payload types, middleware, error handling and the database client live in packages/ and are imported by every service, so a contract change surfaces as a compile error rather than a runtime surprise." },
          { t: "Ownership is the governing principle",
            body: "A service writes its own models freely. Reading another service's model is tolerated only as a documented non-mutating projection. Writing another service's model is debt. That rule is what makes the boundaries mean something even where the database is shared." },
        ]],
      ],
    },

    {
      id: "services",
      label: "Services",
      group: "The Engineering",
      blocks: [
        ["lead",
          "Twelve backend services. The rule that governs all of them: a service writes its own models freely, reading another service's model is tolerated only as a documented non-mutating projection, and writing another service's model is debt."],
        ["table", ["Service", "Owns", "Must never own"], [
          ["api-gateway", "Nothing. No database connection at all.", "Any business logic or data"],
          ["auth", "Users, credentials, sessions, OTP, addresses, seller registration", "Product, order, or money data"],
          ["seller", "Shops, seller settings, seller-facing views", "Buyer identity, product catalogue truth"],
          ["product", "Products, images, inventory, categories, shop reviews", "Orders, payments"],
          ["order", "Orders, order items, order status, delivery projection", "Payment records, wallet balances"],
          ["payment", "No data at all. Owns the Razorpay conversation and emits events.", "Orders, products, any persisted state"],
          ["delivery", "Shipments, tracking, Shiprocket integration", "Order status truth. It projects into order."],
          ["notification", "Notification records and delivery channels", "Anything it notifies about"],
          ["chat", "Conversations, messages, participants", "Orders, products"],
          ["payout-wallet", "Payouts, admin earnings", "Product or order truth"],
          ["admin", "Admin actions, verification, platform oversight", "Direct manipulation of domain data"],
          ["analytics", "Scaffolded, not part of the running system", "Not applicable"],
        ]],
        ["p",
          "Three of them are worth going into properly, because they carry the decisions the rest of the system inherits."],
        ["cards", [
          { t: "API Gateway  ·  port 8080  ·  no database",
            rows: [
              ["Problem it solves", "It is the single public HTTP entry point. Without it, every service would have to be exposed publicly and each one would reimplement CORS, rate limiting and auth forwarding."],
              ["Owns", "Edge concerns only: public API routing, CORS, rate limiting, correlation IDs, internal-route protection and upstream timeout policy."],
              ["Rate limiting", "Two levels. A general limiter, and a stricter one on authentication endpoints. Counters live in Redis so limits hold across gateway instances rather than per process."],
              ["Correlation IDs", "Generated or propagated at the edge and forwarded downstream as a header. One checkout touches gateway, payment, RabbitMQ, order and notification, and without a shared ID reconstructing that path from logs is painful."],
              ["Timeouts", "An upstream timeout configurable through GATEWAY_PROXY_TIMEOUT_MS, defaulting to 30 seconds, so one hung service cannot stall the platform."],
              ["Failure modes", "Service refuses the connection and the gateway returns 503. Service is slow and the gateway returns an upstream timeout. Rate limit trips and the client gets 429. An internal-only route is attempted from outside and the client gets 403. The gateway itself dying makes the API unavailable, with Nginx as the outer boundary."],
            ] },
          { t: "Auth Service",
            rows: [
              ["Owns", "Users, credentials, sessions, OTP state, addresses and seller registration."],
              ["Token model", "Short-lived access tokens plus longer-lived refresh tokens, which limits the damage window if an access token is compromised. Both travel as HTTP-only cookies, so they are unreachable from JavaScript, and the gateway preserves them when forwarding."],
              ["Verification", "Downstream services verify the JWT themselves rather than calling auth on every request. Calling auth per request would make it a synchronous dependency of literally everything and a single point of failure for the whole platform."],
              ["OTP", "Deliberately split between durable identity and ephemeral verification state. Auth generates the OTP and stores it in Redis under a TTL, then publishes to RabbitMQ, and notification-service delivers the email. Auth owns OTP truth, notification owns message delivery."],
              ["Why Redis for OTP", "OTP is temporary state with a natural expiry. A TTL means the key disappears on its own and no cleanup job is needed."],
              ["Anti-abuse", "Redis-backed cooldown between requests, a failed-attempt counter, a temporary lock after repeated failures, and a spam lock after excessive OTP requests."],
            ] },
          { t: "Product Service  ·  the customization engine",
            rows: [
              ["Why it is not a catalogue", "A normal product is a name, price, stock and image. A Eudoro product also carries base price, seller, stock, whether customization is enabled, and a list of customization fields, each with a type, a required flag, validation rules, a display sequence and an optional price modifier."],
              ["A worked example", "A custom mug at ₹499 with three fields: a required text field \"Name\" capped at 30 characters, a required image field \"Photo\" with a max size, and a boolean \"Gift Wrap\" carrying a ₹50 price modifier. The product service owns the configuration that defines those rules."],
              ["Validation, two paths", "Synchronously over HTTP while the buyer fills the form, and over RabbitMQ in a request-and-reply pattern used by payment-service during cart re-validation. The second is deliberately not fire-and-forget: it is asynchronous request/reply, which is a meaningful distinction."],
              ["Why the frontend cannot be trusted", "The browser cart is a UI convenience. Prices, stock, commissions, coupon values and customization submissions are all recomputed or verified server-side, because a client can send anything."],
              ["Events published", "product.*, inventory.*, review.created and stock.out, so other services react without direct coupling."],
              ["Media", "Images go to ImageKit and only the resulting URL is persisted, rather than storing binary blobs in MongoDB."],
              ["Scaling", "product-service runs two replicas in production, which is where the horizontal-scaling claim actually comes from."],
            ] },
        ]],
      ],
    },

    {
      id: "decisions",
      label: "Decisions",
      group: "The Engineering",
      blocks: [
        ["p",
          "Every row here cost something. The tradeoff column is the honest half."],
        ["table", ["Decision", "Reason", "Tradeoff"], [
          ["Microservices over a monolith",
           "Domains have genuinely different operational profiles: stateful WebSocket chat, a flaky third-party shipping dependency, a correctness-critical payment webhook.",
           "No cross-service transactions, so eventual consistency must be designed for explicitly. Debugging spans processes. Higher operational surface than the traffic requires."],
          ["Monorepo on Nx and pnpm",
           "Shared event contracts and middleware are compile-time checked across services, and task orchestration allows running a subset locally.",
           "Shared code makes coupling easy. Boundaries rest on convention rather than physical separation."],
          ["Express over a heavier framework",
           "Small, well understood, and the services are thin. Nothing in the domain needed a framework's opinions.",
           "More wiring written by hand: error handling, validation and middleware ordering are mine to get right."],
          ["MongoDB over SQL",
           "Customization schemas are seller-authored and arbitrary. Forcing them into relational tables means a migration per new field type, or an EAV table. Orders are naturally aggregate documents.",
           "Denormalisation is easy to get wrong, and the database will not enforce consistency for you."],
          ["Prisma as the ORM",
           "Typed access to a 29-model schema, with the generated client shared through packages/ so every service speaks the same types.",
           "An abstraction layer over a database whose flexibility was the reason it was chosen."],
          ["RabbitMQ over synchronous HTTP",
           "Durability if a consumer is down, fan-out to independent consumers, and retries with dead-lettering on money paths.",
           "At-least-once delivery makes idempotency mandatory everywhere, not optional."],
          ["Topic exchanges over direct queues",
           "New consumers subscribe to an existing event without the publisher changing, which is what keeps the fan-out on order.created cheap.",
           "Routing keys become an interface, and a typo in one is a silent no-op rather than an error."],
          ["Kafka not chosen",
           "Routed messaging to a handful of consumers at modest volume. No need for replay or partitioned ordering.",
           "Loses the event log and replay if the system later wants event sourcing."],
          ["Kubernetes not chosen",
           "One instance, one operator, no autoscaling requirement. Compose does everything the deployment actually needs.",
           "Rolling deploys and self-healing are manual, and moving later is real work."],
          ["Redis for ephemeral state",
           "OTPs, sessions and rate-limit counters are naturally expiring and must be shared across processes. TTL replaces cleanup jobs.",
           "Nothing durable can live there. Deliberately treated as a cache, never a database."],
          ["Order created from a payment event",
           "Taking money is irreversible, creating an order is retryable. Separating them means a failed write never produces a charged customer with no order.",
           "A brief window where a payment exists and its order does not, requiring idempotency and reconciliation."],
          ["Wallet credited on delivery",
           "The hold is what makes advance payment safe for the buyer, which is the core trust problem the product solves.",
           "Requires reversal logic for returns and chargebacks, and a ledger with real concurrency control."],
          ["Server-side pricing",
           "The client can send anything. Only server-derived prices are trustworthy.",
           "An extra cross-service validation round trip in the checkout path."],
          ["Three frontends, not one",
           "Different rendering needs (public SEO versus private dashboard), and admin code never ships to a buyer's browser.",
           "Component duplication across apps unless shared packages are used rigorously."],
        ]],
        ["cards", [
          { t: "\"Why not make everything asynchronous?\"",
            body: "Because some callers cannot proceed without an answer. You cannot create a payment session without knowing the real price and that the stock exists. Making that asynchronous would mean charging someone and hoping." },
          { t: "\"Why not make everything synchronous?\"",
            body: "Because then every downstream failure becomes an upstream failure. If notification delivery is synchronous inside order creation, an SMTP outage fails orders. The asynchronous boundary is what keeps unrelated failures unrelated." },
          { t: "\"What happens if order-service is down when a payment succeeds?\"",
            body: "Nothing is lost. The webhook verifies the payment and publishes to a durable queue. The message waits. When order-service comes back it consumes, checks idempotency on the payment ID, and creates the order. The buyer's payment was valid the entire time." },
          { t: "\"Why three frontends when it's one domain?\"",
            body: "The storefront is public and needs server rendering for SEO. The dashboard is behind auth and should never be indexed. The admin console is an internal operations tool. Building one app means every page carries the union of three sets of requirements, and admin code ships to every buyer's browser." },
        ]],
        ["list", "Constraints that shaped all of it", [
          "Solo build, so operational surface I could not personally debug at 2am was a real cost, not a theoretical one.",
          "One small EC2 instance, so service count had a hard ceiling set by memory rather than by architecture.",
          "No traffic yet, so anything justified purely by scale was deferred on purpose.",
        ]],
      ],
    },

    {
      id: "challenges",
      label: "Challenges",
      group: "The Engineering",
      blocks: [
        ["p",
          "Seven things that broke, or would have. Each one is written as what went wrong first, because that is the part worth remembering."],
        ["cards", [
          { t: "1. A payment that succeeds and an order that does not exist",
            rows: [
              ["Problem", "Order creation originally happened inside the checkout request. If the database write failed after Razorpay had taken the money, the customer was charged with nothing to show for it."],
              ["Solution", "Invert the flow. The webhook verifies the payment and publishes an event, order-service consumes it and creates orders idempotently, keyed on the Razorpay payment ID. Failures retry against a durable queue."],
              ["Why it was hard", "It requires accepting that the system is briefly inconsistent by design, and building for that instead of against it, which means idempotency on every consumer and a reconciliation path for drift."],
              ["Lesson", "Keep the irreversible step as small as possible, and put everything retryable on the other side of it."],
            ] },
          { t: "2. Two payout requests locking the same money",
            rows: [
              ["Problem", "The wallet lock read the balance, checked availability, then incremented the locked amount. Two concurrent requests both passed the check and both incremented, so locked funds could exceed the actual balance. The same money committed twice."],
              ["Solution", "Fold the check into the write as a conditional update. Since the database cannot compare two fields against each other in a filter, each field is guarded against the read-time snapshot of the other. A losing request matches zero rows and is refused."],
              ["Why it was hard", "It is invisible in any test that runs the operations sequentially, and the code looked obviously correct."],
              ["Lesson", "If a check and a write are separate statements, they are racy, and no amount of care between them fixes it."],
            ] },
          { t: "3. A resilience mechanism that manufactured fake successes",
            rows: [
              ["Problem", "Shiprocket calls sit behind a circuit breaker. When open, it returned a fallback response. Shipment creation persisted that fallback as a real shipment with a null carrier ID and advanced the order, so an outage produced orders the system believed were shipped and that no retry would ever correct."],
              ["Solution", "Validate that real carrier identifiers came back. Their absence is a creation failure: the shipment is marked failed, the order is not advanced, an admin is alerted, and the message is retried."],
              ["Why it was hard", "The bug was produced by a resilience feature behaving exactly as designed. The failure was silent precisely when the system was under stress."],
              ["Lesson", "A fallback is a degraded answer, not an answer. If it is indistinguishable from success at the call site, the system lies to itself under load."],
            ] },
          { t: "4. Reversing money that was already paid out",
            rows: [
              ["Problem", "The wallet is credited on delivery. But a delivered order can later come back as returned, RTO or lost, and a chargeback can arrive after the seller has been credited."],
              ["Solution", "A single idempotent reversal path consumes delivery status changes and no-ops when no credit exists, so it is safe whether the return happens before or after delivery. Involuntary losses are deliberately exempt from the non-negative balance guard: the seller can go into debt, netted out by future earnings, rather than the platform absorbing it."],
              ["Why it was hard", "The exception to the safety rule is the correct behaviour, which means the guard cannot simply be applied uniformly."],
              ["Lesson", "Financial invariants are business rules before they are technical ones. \"Balance can never go negative\" was wrong. The real rule distinguishes voluntary withdrawals from involuntary losses."],
            ] },
          { t: "5. Cart identity for products that are never identical",
            rows: [
              ["Problem", "On a normal store, adding the same product twice increments a quantity. Here, the same product with a different engraving is a different physical object, and with the same engraving it should merge."],
              ["Solution", "Derive the cart item identity from the product plus its selected options plus its customization payload, with all keys sorted before serialisation, so identity is canonical rather than dependent on the order the form was filled in."],
              ["Why it was hard", "Without sorting, the same customization entered in a different sequence produces a different identity and the buyer sees two lines for one visibly identical item."],
              ["Lesson", "When identity is derived from a composite, it has to be canonicalised, or it is not identity."],
            ] },
          { t: "6. Deploying twelve services onto one small instance",
            rows: [
              ["Problem", "Building the full stack on a 2GB instance exhausted memory, because Docker Compose resolves and rebuilds dependencies rather than just the target."],
              ["Solution", "Surgical builds against a single service without dependencies, then recreating only that container. Per-service CPU and memory limits tiered by criticality, replicas only where traffic justifies them, and health-check-gated startup ordering for the gateway and frontends."],
              ["Why it was hard", "The failure appears at deploy time, on the host, under conditions that never occur locally."],
              ["Lesson", "Resource constraints are part of the architecture. A service count you can develop with is not automatically a service count you can deploy."],
            ] },
          { t: "7. Removing a service I had already built",
            rows: [
              ["Problem", "A custom logging service with WebSocket streaming worked, but it sat on the critical path for observability while being a single point of failure. It failed at exactly the moment I most needed it, during an incident, and observability infrastructure that fails with your system is worse than useless because you trust it."],
              ["Solution", "Delete it. Promtail ships container logs, Loki stores and indexes, Prometheus scrapes metrics, Grafana queries both. Log collection no longer depends on application code being healthy, and I got querying and dashboards I was never going to build myself."],
              ["Why it was hard", "Deleting working code you wrote is harder than adding more."],
              ["Lesson", "\"We could build this\" and \"we should build this\" are different questions, and for infrastructure the answers usually differ."],
            ] },
        ]],
      ],
    },

    {
      id: "workflows",
      label: "Workflows",
      group: "The Engineering",
      diagramDebt: true,
      blocks: [
        ["lead",
          "One chain runs the whole business, from a buyer opening a product to a seller getting paid."],
        ["pre",
`                    CHECKOUT
                       |
                       v
              Payment Service
                       |
                validates cart
                       |
                  Redis session
                       |
                       v
                    Razorpay
                       |
                       v
             payment.succeeded
                       |
                       v
                    RabbitMQ
                       |
                       v
                Order Service
                       |
                 creates order
                       |
                 order.created
                       |
                       v
                Seller accepts
                       |
                order.accepted
                       |
                       v
              Delivery Service
                       |
                   Shiprocket
                       |
                tracking updates
                       |
                       v
                order.delivered
                       |
                       v
           Payout Wallet Service
                       |
                 credit seller
                       |
                 payout request
                       |
                       v
                Admin approval`],
        ["p", "Customization. The seller authors a schema, the buyer supplies data conforming to it. Validation is enforced on the server, so an order cannot exist without the information needed to fulfil it."],
        ["pre",
`Seller defines field schema on product
        |
Buyer opens product, fills customization form
        |
Server-side validation against the product's schema
        |
Valid submission stored with the cart item`],
        ["p", "Checkout and payment. Nothing the client sends about price is trusted. The payment is complete and verified before any order exists."],
        ["pre",
`Cart -> server re-validates price, stock, customization, coupon
     -> Razorpay order created for the server-computed amount
     -> buyer pays
     -> webhook verified (HMAC, constant-time)
     -> payment.succeeded published`],
        ["p", "Order fulfilment. One payment becomes several orders, one per seller, all-or-nothing."],
        ["pre",
`payment.succeeded
     -> idempotency check on payment ID
     -> cart grouped by shop
     -> one order per shop + customizations, committed atomically
     -> orders.order.created published
            |-> notification-service   (buyer + seller notified)
            |-> payout-wallet-service  (earnings recorded)
            +-> admin-service          (platform earnings)`],
        ["p", "Delivery. Shipping is triggered by the platform, and carrier status flows back to every party that needs it."],
        ["pre",
`Seller accepts order -> orders.order.accepted
     -> delivery-service creates Shiprocket shipment (circuit breaker)
     -> AWB generated
     -> carrier webhooks -> delivery.status.changed
            |-> order-service          (status projection)
            |-> notification-service   (buyer updates)
            +-> payout-wallet-service  (reversal if returned/RTO/lost)`],
        ["p", "Wallet and payout. Money is held until delivery, locked atomically when requested, and moved through a guarded state machine with an audit record on every transition."],
        ["pre",
`Order delivered -> seller wallet credited (never at payment time)
        |
Seller requests payout -> balance locked atomically
        |
   Pending --approve--> Approved --pay--> Paid
        |                   |
     reject            mark failed -> back to Approved, retryable
        |
   Rejected

Scheduled reconciliation asserts impossible states -> alerts admin`],
      ],
    },

    {
      id: "data-model",
      label: "Data Model",
      group: "The Engineering",
      blocks: [
        ["lead",
          "Two of the 29 models carry the entire customization feature, and the relationship between them is the thing worth understanding."],
        ["pre",
`products
  +-- customizationFields: customization_field_template[]  <- SELLER defines the schema
        . fieldKey        (e.g. "engraving_text")
        . fieldType       (CustomFieldType enum)
        . required
        . validation rules
        . sequence
        . price modifier
  + customizationPreview
  + customizationInstructions

order_item_customization                                   <- BUYER's submitted values
  . fieldKey  ---------- matches customization_field_template.fieldKey
  . value`],
        ["p",
          "The seller authors a schema. The buyer supplies data conforming to it. fieldKey is the join between the two. That is the whole idea, and it should take fifteen seconds to draw on a whiteboard."],
        ["p",
          "A worked example makes the shape obvious. A custom mug at ₹499 carries a required text field \"Name\" capped at 30 characters, a required image field \"Photo\" with a maximum size, and a boolean \"Gift Wrap\" with a ₹50 price modifier. None of those are columns anyone migrated for. The seller created them in the dashboard, and the platform enforces them at checkout."],
        ["note",
          "This is the reason MongoDB was the right call rather than the lazy one. Seller-authored arbitrary schemas in a relational database mean either a migration per new field type or an EAV table, and both are worse than a document."],
        ["list", "Validation runs in two places, deliberately", [
          "Synchronously over HTTP while the buyer is filling the form, so the error appears where the mistake was made.",
          "Over RabbitMQ in a request-and-reply pattern, used by payment-service during cart re-validation, so a stale browser cart cannot smuggle an invalid submission past checkout. Unlike the fire-and-forget events elsewhere in the system, this one is asynchronous request/reply, which is a meaningful distinction.",
        ]],
        ["p",
          "For the rest of the schema, ownership is the governing rule: a service writes its own models freely, reading another service's model is tolerated only as a documented non-mutating projection, and writing another service's model is debt. The full ownership matrix is on the Services tab."],
      ],
    },

    {
      id: "security",
      label: "Security",
      group: "The Engineering",
      blocks: [
        ["cards", [
          { t: "Authentication", body: "OTP-verified registration, sessions in HTTP-only cookies so tokens are unreachable from JavaScript, with a centralised cookie helper keeping flags consistent. Short-lived access tokens paired with longer-lived refresh tokens limit the damage window if an access token leaks." },
          { t: "Downstream verification", body: "Services verify the JWT themselves rather than calling auth-service on every request. Calling auth per request would make it a synchronous dependency of every other service and a single point of failure for the entire platform." },
          { t: "Authorization", body: "Role-based middleware shared across all services, so buyer, seller and admin checks behave identically everywhere rather than being reimplemented per controller. A separate class of internal routes handles service-to-service calls under internal-service authentication, and the gateway rejects external attempts on them with a 403." },
          { t: "Rate limiting", body: "Tiered at the gateway, with higher limits for authenticated users and stricter limits on authentication endpoints. Counters live in Redis so limits hold across gateway instances rather than per process." },
          { t: "OTP anti-abuse", body: "Redis-backed cooldown between requests, a failed-attempt counter, a temporary lock after repeated failures, and a spam lock after excessive OTP requests. The OTP itself carries a TTL, so expiry needs no cleanup job." },
          { t: "Server-side validation", body: "Prices, stock, commissions, coupon values and customization submissions are all recomputed or verified server-side. Client input is never authoritative on anything that affects money or fulfilment. The browser cart is a UI convenience, the server cart is the contract." },
          { t: "Webhook security", body: "Payment webhooks are verified by HMAC over the raw request body, compared in constant time so signature verification cannot be attacked through timing." },
          { t: "Idempotency", body: "Order creation is keyed on the payment ID. Refunds and wallet operations carry idempotency handling. Every money-path consumer is safe to run twice, which at-least-once delivery guarantees will happen." },
          { t: "Concurrency safety", body: "Wallet balance changes use conditional atomic updates that fold their eligibility check into the write, preventing double-locking and negative balances." },
          { t: "Transport and headers", body: "TLS terminated at Nginx, Helmet security headers on both gateway-origin and service responses, and a CORS allowlist restricted to known frontend origins." },
          { t: "Failure isolation", body: "Third-party shipping calls sit behind a circuit breaker and degraded responses are treated as failures rather than successes. A configurable upstream timeout at the gateway, defaulting to 30 seconds, prevents one hung service from stalling the platform." },
          { t: "Auditability", body: "Money-affecting admin actions write audit records. Money-path code logs payment, order, seller, payout and event identifiers by convention, and correlation IDs tie a request across every service it touches." },
          { t: "Reliability monitoring", body: "Scheduled reconciliation asserts financial invariants and alerts on impossible states, such as a locked balance exceeding a total balance. A read-only consistency script sweeps orders, shipments, refunds, wallet and payouts." },
          { t: "Environment validation", body: "Services fail fast at boot on missing or invalid configuration rather than failing on the first request that needs it." },
        ]],
      ],
    },

    {
      id: "infra",
      label: "Infra",
      group: "The Engineering",
      blocks: [
        ["lead",
          "Three Next.js frontends, an API gateway and eleven backend services, on one EC2 instance behind Nginx, via Docker Compose."],
        ["cards", [
          { t: "Nginx", body: "Terminates TLS and reverse-proxies to the gateway, with explicit rewrite rules guarding against path-prefix duplication. It is also the outer boundary if the gateway itself goes down." },
          { t: "Managed backing services", body: "MongoDB runs on Atlas. Redis and RabbitMQ are managed rather than containerised, so stateful infrastructure is not tied to the application host's lifecycle." },
          { t: "Resource discipline", body: "Per-service CPU and memory limits tiered by criticality, from 0.05 to 0.3 CPU and 128 to 512MB. product-service and user-ui run two replicas, lower-traffic services run one. The gateway and frontends wait on service_healthy for their dependencies before starting." },
          { t: "Build strategy", body: "Services are built surgically: one service without its dependency tree, then that container recreated, because a full-stack rebuild exhausts memory on a small instance." },
          { t: "Observability stack", body: "Promtail ships container logs, Loki stores and indexes them, Prometheus scrapes per-service metrics endpoints, and Grafana queries both. Log collection does not depend on application code being healthy, which is the whole reason the custom logger service was deleted." },
          { t: "CI", body: "GitHub Actions running lint, test and build across the affected project graph." },
        ]],
        ["table", ["Category", "Technology"], [
          ["Languages", "TypeScript, Node.js"],
          ["Frontend", "Next.js 15 App Router, React 19, Tailwind, React Query, Zustand, Jotai, React Hook Form, TanStack Table"],
          ["Backend", "Express"],
          ["Database", "MongoDB Atlas, Prisma ORM"],
          ["Messaging", "RabbitMQ (amqplib), topic exchanges"],
          ["Ephemeral state", "Redis (ioredis)"],
          ["Background jobs", "BullMQ, node-cron"],
          ["Real-time", "Socket.IO"],
          ["Payments and shipping", "Razorpay, Shiprocket"],
          ["Media and email", "ImageKit, Nodemailer, EJS"],
          ["Resilience", "opossum circuit breaker"],
          ["Infrastructure", "Docker, Docker Compose, Nginx, AWS EC2"],
          ["Observability", "Prometheus, Grafana, Loki, Promtail, OpenTelemetry"],
          ["Testing", "Jest, Playwright, custom integration and reconciliation scripts"],
          ["Tooling", "Nx, pnpm workspaces, ESLint, GitHub Actions"],
        ]],
      ],
    },

    {
      id: "whats-next",
      label: "What's Next",
      group: "The Engineering",
      blocks: [
        ["lead",
          "Deployed and live at eudoro.art. The roadmap below is ordered by what actually improves the system, not by what is easiest."],
        ["list", "Near-term", [
          "Extract the wallet into its own model owned solely by the payout service, removing the last shared ownership of money state between two services.",
          "Transactional outbox for event publication, so a published event cannot be lost between a state change and the broker. That moves the system from detecting drift to preventing it.",
          "Uniform strict TypeScript across every service, with the payment path first.",
          "Complete the shared frontend component library, removing the components still duplicated across applications.",
          "Roll out internal SSR routing across all server components rather than the two SEO-critical routes.",
        ]],
        ["list", "Long-term", [
          "Further physical database separation per service. The per-service client factory and connection resolution already exist, and chat and notification are the natural first candidates since they own their models outright with no inbound relations. The relationally-coupled commerce core stays shared until there is a reason beyond architectural purity.",
          "Customization template versioning, pinning order items to the schema version they were created against.",
          "Distributed tracing as the primary debugging path, building on the OpenTelemetry instrumentation already in place.",
          "Horizontal scaling for chat, which needs a Redis adapter for Socket.IO before it can run more than one instance.",
          "Platform-wide analytics service, currently scaffolded but not deployed.",
        ]],
        ["note",
          "Solo engineering project across architecture, backend, frontend, infrastructure and deployment. A friend is working on marketing and distribution."],
      ],
    },
  ],
};

export default eudoro;
