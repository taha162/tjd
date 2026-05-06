import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        obsidian: {
          950: "#030507",
          900: "#060b12",
          800: "#0a1019",
          700: "#0e1822",
          600: "#13202e",
          500: "#192840",
        },
        cyan: {
          glow: "#00e5ff",
          DEFAULT: "#00bcd4",
          dim: "#0097a7",
          50: "rgba(0,229,255,0.05)",
          100: "rgba(0,229,255,0.1)",
          200: "rgba(0,229,255,0.2)",
          300: "rgba(0,229,255,0.3)",
          400: "#00e5ff",
          500: "#00bcd4",
          600: "#0097a7",
        },
        aurora: {
          blue: "#0066ff",
          teal: "#00e5cc",
          pink: "#e040fb",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "glow-conic": "conic-gradient(from 180deg at 50% 50%, #00e5ff22 0deg, #0066ff22 180deg, #00e5ff22 360deg)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        "surface-gradient": "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,229,255,0.25), 0 0 60px rgba(0,229,255,0.08)",
        "glow-cyan-lg": "0 0 40px rgba(0,229,255,0.3), 0 0 100px rgba(0,229,255,0.12)",
        "glow-blue": "0 0 20px rgba(0,102,255,0.2), 0 0 60px rgba(0,102,255,0.06)",
        "glow-sm": "0 0 10px rgba(0,229,255,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "elevation-1": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
        "elevation-2": "0 4px 16px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.3)",
        "elevation-3": "0 12px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.35)",
        "elevation-4": "0 24px 64px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in-right": "slideInRight 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 7s ease-in-out infinite",
        pulse_glow: "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-shift": "gradientShift 10s ease infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(0.5deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.3deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "60px",
      },
    },
  },
  plugins: [],
};
export default config;
