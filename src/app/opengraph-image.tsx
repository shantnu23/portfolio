import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#090D13",
          backgroundImage:
            "linear-gradient(rgba(232,238,244,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,238,244,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "#E8EEF4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 40 40" fill="none">
            <path d="M1 7.5 7.5 1H39v31.5L32.5 39H1V7.5Z" stroke="rgba(232,238,244,0.35)" strokeWidth="1.25" />
            <path d="M18 11H8.5v9H18v9H8.5" stroke="#8CE4D6" strokeWidth="2.4" />
            <path d="M31.5 11H22v9h9.5v9H22" stroke="#8CE4D6" strokeWidth="2.4" />
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#8CE4D6", textTransform: "uppercase" }}>
            {profile.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 980 }}>
            {profile.headline}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#91A0B2" }}>
            AI engineering · Full-stack · Blockchain · Robotics simulation
          </div>
        </div>
      </div>
    ),
    size,
  );
}
