/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/js/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',        // Pure black
        foreground: '#FFFFFF',        // Pure white
        'text-secondary': '#C0C0C0',  // Silver/light gray
        'accent': '#D4AF37',          // Rich gold
        'accent-light': '#FFD700',    // Bright gold
        'accent-dark': '#B8941E',     // Dark gold
        'accent-bronze': '#CD7F32',   // Bronze accent
        'gray-50': '#F8F8F8',
        'gray-100': '#E8E8E8',
        'gray-200': '#D0D0D0',
        'gray-300': '#B0B0B0',
        'gray-400': '#909090',
        'gray-500': '#707070',
        'gray-600': '#505050',
        'gray-700': '#303030',
        'gray-800': '#1A1A1A',
        'gray-900': '#0D0D0D',
        'border': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 163, 255, 0.2)',
        'glow-md': '0 0 40px rgba(0, 163, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(0, 163, 255, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 163, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 163, 255, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
