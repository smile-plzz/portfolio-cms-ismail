import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/**
 * Whether the content store is reachable. When it is not — a fresh clone with
 * no env, or CI — the data layer serves the seed manifest instead, so the site
 * renders the same content either way and there is no fixture to drift.
 */
export const sanityConfigured = Boolean(projectId);

export const client: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/** Writes require the token; only ever constructed server-side. */
export function writeClient(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error(
      "Sanity write client needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN",
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(source: unknown, width: number, height?: number) {
  if (!builder || !source) return null;
  let url = builder.image(source as never).width(width).auto("format").fit("crop");
  if (height) url = url.height(height);
  return url.url();
}
