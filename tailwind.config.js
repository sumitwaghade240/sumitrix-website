/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070709',
          900: '#0c0d10',
          850: '#111217',
          800: '#171820',
          700: '#22242f',
          600: '#323545',
        },
        neon: {
          lime: '#ccff00',
          glow: '#d9ff33',
          dim: 'rgba(204, 255, 0, 0.15)',
        },
        surface: {
          glass: 'rgba(18, 19, 26, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(204, 255, 0, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
