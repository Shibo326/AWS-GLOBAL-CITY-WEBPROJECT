import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        card: "var(--card)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "accent-orange": "var(--accent-orange)",
        "accent-blue": "var(--accent-blue)",
        "accent-warm": "var(--accent-warm)",
        "accent-warm-light": "var(--accent-warm-light)",
        border: "var(--border)",
        glow: "var(--glow)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
        accent: ["var(--font-accent)", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "50": "12.5rem",
        "60": "15rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
      },
      letterSpacing: {
        "hero": "0.08em",
        "label": "0.12em",
      },
      lineHeight: {
        "body": "1.75",
      },
      fontSize: {
        "hero": "clamp(64px, 10vw, 120px)",
      },
      borderRadius: {
        "card": "12px",
      },
      backdropBlur: {
        "nav": "12px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "1200": "1200ms",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "blink-green": "blink-green 1s infinite",
        "status-pulse-blue": "status-pulse-blue 2s infinite",
        "status-pulse-orange": "status-pulse-orange 1.2s infinite",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "marquee-mobile": "marquee 20s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 153, 0, 0)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(255, 153, 0, 0.3)" },
        },
        "blink-green": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "status-pulse-blue": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "status-pulse-orange": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
