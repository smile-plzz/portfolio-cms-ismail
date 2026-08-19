import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Md. Ismail Hossain";

/**
 * The share card is the same typographic composition as the hero: ground,
 * hairline, one accent rule. Cormorant is not available to the OG renderer,
 * so it falls back to the serif the token stack already names.
 */
export default async function Image() {
  const settings = await getSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f2f2",
          color: "#201f1d",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7d7979",
          }}
        >
          {settings.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: "#b68235", width: 120 }} />
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              marginTop: 28,
              maxWidth: 900,
            }}
          >
            {settings.positioning}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#605d5d" }}>
          {settings.role} · {settings.locationShort}
        </div>
      </div>
    ),
    size,
  );
}
