/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'AzeretMono': ['Azeret Mono', 'monospace'],
        'Anton' : ['Anton', 'sans-serif'],
        'AudioWide' : ['Audiowide', 'cursive'],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '3-250': 'repeat(3, minmax(250px, 1fr))',
        '2-250': 'repeat(2, minmax(250px, 1fr))',
        '1-250': 'repeat(1, minmax(250px, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}