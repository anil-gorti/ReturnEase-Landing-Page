

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF5',
        ink: '#1a1a1a',
        amber: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      boxShadow: {
        'solid': '4px 4px 0px 0px rgba(26, 26, 26, 1)',
        'solid-sm': '2px 2px 0px 0px rgba(26, 26, 26, 1)',
      }
    },
  },
  plugins: [],
}

