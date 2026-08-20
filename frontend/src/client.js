import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Read-only on purpose. There is no token here: VITE_* values are inlined into
// the bundle, so anything put in one is public. The dataset is public and every
// query on this site is a read. The one write (the contact form) goes through
// /api/contact, which holds the token server-side.
export const client = createClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-03-03",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
