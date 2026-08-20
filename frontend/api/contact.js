// The contact form is the only thing on this site that WRITES to Sanity, and a
// write token must never reach the browser. VITE_* vars are inlined into the
// bundle at build time, so the token lives here instead: a Vercel function reads
// SANITY_WRITE_TOKEN from the server environment, where it stays.
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!PROJECT_ID || !TOKEN) return res.status(500).json({ error: "Contact form is not configured" });

  // Validate here, not in the component: this is the trust boundary, and the
  // browser copy of the check is only there to save the user a round trip.
  const name = clean(req.body?.name, 100);
  const email = clean(req.body?.email, 200);
  const message = clean(req.body?.message, 5000);

  if (!name || !message) return res.status(400).json({ error: "Name and message are required" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "That email doesn't look right" });

  try {
    const r = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2023-03-03/data/mutate/production`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
        body: JSON.stringify({ mutations: [{ create: { _type: "contact", name, email, message } }] }),
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!r.ok) throw new Error(`Sanity responded ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact]", err.message);
    return res.status(502).json({ error: "Could not send that. Try emailing me directly." });
  }
}
