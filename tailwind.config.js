/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontjapan: ['"Noto Sans Japanese"', "sans-serif"],
      },
      color: {
        "main-green": "linear-gradient(to right, #49DB83, #3B85F2)",
      },
      backgroundImage: {
        "main-green": "linear-gradient(to right, #49DB83, #3B85F2)",
      },
    },
  },
  plugins: [],
};
