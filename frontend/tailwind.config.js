/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF6EA',
          100: '#F2E9D8',
          200: '#EADFC7',
        },
        leaf: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#6B8B5E',
          600: '#4B6142',
          700: '#34462D',
        },
        terracotta: {
          50: '#FBE9E7',
          100: '#FFCCBC',
          500: '#C8684D', // Lighter clay
          600: '#A24A32', // Clay
          700: '#8B3C26',
        },
        yellow: {
          50: '#FFF8E1',
          100: '#FFECB3',
          400: '#E3A83B', // Marigold
          500: '#C88A22', // Marigold-deep
          600: '#A87319', // Added missing yellow-600 used in icons
        },
        ink: {
          500: '#5B4E3E',
          800: '#2B2118',
        },
        // Override default grays to match HaatPata's ink theme for easy replacement
        white: '#FBF6EA',
        gray: {
          50: '#FBF6EA',
          100: '#F2E9D8',
          200: '#EADFC7',
          300: '#D9C9A3', // Line color from HaatPata
          400: '#C9BBA0',
          500: '#5B4E3E',
          600: '#5B4E3E',
          700: '#2B2118',
          800: '#2B2118',
          900: '#1E1A14',
        }
      }
    },
  },
  plugins: [],
}
