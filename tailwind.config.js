/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // اضافه کردن grid-row-17
        '17': 'repeat(17, minmax(0, 1fr))',
      },
      zIndex: {
        '1': '1', // اضافه کردن zindex1
      },
    },
  },
  plugins: [],
}


