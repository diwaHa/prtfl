import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/content";

export const alt = "Nova Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const site = getSiteConfig();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #12121a 100%)",
          color: "#e8e8ef",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#818cf8",
            marginBottom: 24,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
            background: "linear-gradient(135deg, #e8e8ef, #6366f1, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.title.replace(`${site.name} — `, "")}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            color: "#9494a8",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {site.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
