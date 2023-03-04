import sanityClient, { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const id = import.meta.env.VITE_APP_SANITY_PROJECT_ID;
const token = import.meta.env.VITE_APP_SANITY_PROJECT_TOKEN;

export const client = createClient({
  projectId: id,
  dataset: "production",
  apiVersion: "2023-03-03",
  useCdn: true,
  token: token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
