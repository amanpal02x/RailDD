/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'railway-blue': '#1e3a8a',
        'railway-red': '#dc2626',
      },
    },
  },
  plugins: [],
}
