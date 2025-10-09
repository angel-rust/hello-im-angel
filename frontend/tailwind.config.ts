import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#D3D3D3",
        primary: "#000000",
        accent: {
          blue: "#00A3FF",
        },
        neutral: "#D3D3D3",
        gray: {
          10: "#1A1A1A",
          20: "#333333",
          30: "#4D4D4D",
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'accent-glow': 'radial-gradient(circle at center, rgba(0, 163, 255, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 163, 255, 0.3)',
        'glow-md': '0 0 30px rgba(0, 163, 255, 0.4)',
        'glow-lg': '0 0 45px rgba(0, 163, 255, 0.5)',
      },
      borderRadius: {
        'subtle': '0.375rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
