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
        "white-50": "#F9F9F9",
      },
      backgroundImage: {
        "split-white-black":
          "linear-gradient(to right, #000000 55% , white 45%);",
      },
    },
  },
  plugins: [],
};
