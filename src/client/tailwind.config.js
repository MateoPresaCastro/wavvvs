/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '80VW': '80vw',
        '70VW': '70vw',
      },
      height: {
        '80VH': '80vh',
      },
    },
    plugins: [],
  }
}
