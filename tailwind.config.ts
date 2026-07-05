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
        "accent-purple": "var(--accent-purple)",
        "accent-pink": "var(--accent-pink)",
        "accent-green": "var(--accent-green)",
        "accent-coral": "var(--accent-coral)",
        "sky-deep": "var(--sky-deep)",
        "sky-top": "var(--sky-top)",
        "sky-mid": "var(--sky-mid)",
        "sky-light": "var(--sky-light)",
        "sky-pale": "var(--sky-pale)",
        "cloud-white": "var(--cloud-white)",
        "cloud-body": "var(--cloud-body)",
        "cloud-soft": "var(--cloud-soft)",
        "land-light": "var(--land-light)",
        "land-mid": "var(--land-mid)",
        "land-dark": "var(--land-dark)",
        "land-ground": "var(--land-ground)",
        "land-runway": "var(--land-runway)",
        "sunrise-warm": "var(--sunrise-warm)",
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
        "wiggle": "wiggle 1s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 153, 0, 0)" },
          "50%": { boxShadow: "0 0 24px 6px rgba(255, 153, 0, 0.25)" },
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
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
