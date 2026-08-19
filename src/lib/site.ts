/**
 * The canonical origin. Vercel injects the deployment host, so previews get
 * absolute URLs that point at themselves rather than at production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? "https://ismailhossain.dev"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://ismailhossain.dev")
).replace(/\/$/, "");

export function absolute(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
