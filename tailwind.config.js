/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        ghost: 'rgba(0, 0, 0, 0.05)',
      }
    }
  },
  darkMode: 'class',
  plugins: [],
}
