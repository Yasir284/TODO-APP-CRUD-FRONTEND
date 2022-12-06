/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "black-900": "#111111",
        "black-800": "#1b1a19",
        "black-700": "#252423",
        "black-500": "#3b3a39",
      },
    },
  },
  plugins: [],
};
