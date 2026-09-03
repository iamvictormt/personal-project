import { ImageResponse } from "next/og";

export const alt = "Victor Monteiro Torres - Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f3ed",
        color: "#151515",
        padding: "64px",
        fontFamily: "Arial",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(21,21,21,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -120,
          width: 520,
          height: 760,
          background: "rgba(21,21,21,0.08)",
          transform: "rotate(24deg)",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        <span style={{ fontSize: 24, letterSpacing: 8, fontWeight: 700 }}>
          VMT // SOFTWARE DEVELOPER
        </span>
        <span style={{ fontSize: 24, letterSpacing: 5 }}>BR</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
        <h1
          style={{
            margin: 0,
            fontSize: 94,
            lineHeight: 0.92,
            letterSpacing: -4,
            maxWidth: 860,
            fontWeight: 900,
          }}
        >
          Victor Monteiro Torres
        </h1>
        <p style={{ margin: 0, maxWidth: 760, fontSize: 38, lineHeight: 1.18 }}>
          React, Next.js, Angular, Node.js, Java, Spring Boot e sistemas web.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          position: "relative",
          fontSize: 24,
          letterSpacing: 4,
          fontWeight: 700,
        }}
      >
        <span>Next.js</span>
        <span>//</span>
        <span>React</span>
        <span>//</span>
        <span>Angular</span>
        <span>//</span>
        <span>Node.js</span>
        <span>//</span>
        <span>Java</span>
      </div>
    </div>,
    size,
  );
}
