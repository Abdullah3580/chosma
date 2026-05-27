/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          light: '#EAF7FA',
          mid: '#B8E6EF',
          DEFAULT: '#7ECBDB',
          dark: '#3AABB8',
          darker: '#2A8A96',
        },
        brown: {
          light: '#F5EDE3',
          mid: '#E0C4A8',
          DEFAULT: '#C4956A',
          dark: '#8B6340',
          darker: '#6B4C2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
