/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      screens: {
        sm: "1280px",
      },
      padding: {
        DEFAULT: "1rem",
      },
    },
  },
  plugins: [],
};
