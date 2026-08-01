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
        nexus: {
          950: '#06080d',
          900: '#0b0f19',
          850: '#111726',
          800: '#172033',
          700: '#23304a',
          600: '#334466',
          accent: '#00F0FF',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'spin 4s linear infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
