import { useState, useEffect } from "react";

export default function App() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      {/* Background grid */}
      <div style={styles.grid} />

      {/* Noise overlay */}
      <div style={styles.noise} />

      <div style={styles.container}>
        {/* Icon */}
        <div style={styles.iconWrap}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff4d4d" strokeWidth="1.5" />
            <path d="M8 8l8 8M16 8l-8 8" stroke="#ff4d4d" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div style={styles.iconGlow} />
        </div>

        {/* Code tag */}
        <p style={styles.code}>410 — GONE</p>

        {/* Main heading with glitch */}
        <h1 style={{ ...styles.heading, ...(glitch ? styles.glitch : {}) }}>
          No Longer Available
        </h1>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Message */}
        <p style={styles.message}>
          This page has been permanently removed and will not be coming back.
        </p>

        {/* Sub message */}
        <p style={styles.sub}>
          If you believe this is an error, please contact the site owner.
        </p>

        {/* Decorative bottom bar */}
        <div style={styles.bottomBar}>
          <span style={styles.dot} />
          <span style={{ ...styles.dot, opacity: 0.5 }} />
          <span style={{ ...styles.dot, opacity: 0.2 }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,77,0.3); }
          50%       { box-shadow: 0 0 0 16px rgba(255,77,77,0); }
        }
        @keyframes scanline {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes glitch {
          0%   { clip-path: inset(40% 0 60% 0); transform: translate(-4px, 0); }
          20%  { clip-path: inset(10% 0 80% 0); transform: translate(4px, 0); }
          40%  { clip-path: inset(70% 0 20% 0); transform: translate(-2px, 0); }
          60%  { clip-path: inset(30% 0 55% 0); transform: translate(2px, 0); }
          80%  { clip-path: inset(55% 0 35% 0); transform: translate(-1px, 0); }
          100% { clip-path: inset(40% 0 60% 0); transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Space Mono', monospace",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,77,77,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,77,0.04) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  noise: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
    opacity: 0.4,
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "48px 40px",
    maxWidth: "480px",
    width: "90%",
    border: "1px solid rgba(255,77,77,0.15)",
    borderRadius: "2px",
    background: "rgba(255,77,77,0.03)",
    backdropFilter: "blur(12px)",
    animation: "fadeIn 0.8s ease forwards",
  },
  iconWrap: {
    position: "relative",
    marginBottom: "28px",
    animation: "pulse 2.5s ease-in-out infinite",
    borderRadius: "50%",
  },
  iconGlow: {
    position: "absolute",
    inset: "-8px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,77,77,0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  code: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    letterSpacing: "4px",
    color: "#ff4d4d",
    textTransform: "uppercase",
    marginBottom: "16px",
    opacity: 0.8,
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(28px, 6vw, 42px)",
    fontWeight: 800,
    color: "#f0f0f0",
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
    marginBottom: "24px",
  },
  glitch: {
    animation: "glitch 0.2s steps(1) forwards",
    color: "#ff4d4d",
  },
  divider: {
    width: "40px",
    height: "2px",
    background: "linear-gradient(90deg, #ff4d4d, transparent)",
    marginBottom: "24px",
  },
  message: {
    fontSize: "14px",
    color: "rgba(240,240,240,0.6)",
    lineHeight: 1.7,
    marginBottom: "12px",
    fontFamily: "'Space Mono', monospace",
  },
  sub: {
    fontSize: "12px",
    color: "rgba(240,240,240,0.3)",
    lineHeight: 1.6,
    fontFamily: "'Space Mono', monospace",
  },
  bottomBar: {
    display: "flex",
    gap: "8px",
    marginTop: "36px",
    alignItems: "center",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ff4d4d",
  },
};
