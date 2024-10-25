/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      //to hide scrollbar
      addUtilities({
        ".scrollbar-hide": {
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE 10+ */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, Edge, Opera */,
        },
      });
    },
  ],
};
