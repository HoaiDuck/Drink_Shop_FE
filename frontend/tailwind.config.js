/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontjapan: ['"Noto Sans Japanese"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
