/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'dotgothic': ['"DotGothic16"', 'sans-serif'],
      },
      colors: {
        'neon-pink': '#FF69B4',
        'neon-purple': '#8A2BE2',
        'dark-bg': '#0F0F1A',
        'dark-accent': '#1A1A2E',
        'dark-purple': '#2D2D4F',
      },
    },
  },
  plugins: [],
} 