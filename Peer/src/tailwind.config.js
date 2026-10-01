/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        paperDim: 'var(--paper-dim)',
        ink: 'var(--ink)',
        inkSoft: 'var(--ink-soft)',
        tealDeep: 'var(--teal-deep)',
        tealMid: 'var(--teal-mid)',
        cyan: 'var(--cyan)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}