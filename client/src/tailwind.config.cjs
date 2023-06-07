/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        progress100: {
          "0%:": {
            width: "0%",
            background: "#6BC0B1",
          },
          "100%": {
            width: "100%",
            background: " #6BC0B1",
            boxShadow: "0, 0, 3px, #6BC0B1",
          },
        },
        progress90: {
          "0%:": {
            width: "0%",
            background: "#6BC0B1",
          },
          "100%": {
            width: "90%",
            background: " #6BC0B1",
            boxShadow: "0, 0, 3px, #6BC0B1",
          },
        },
        progress80: {
          "0%:": {
            width: "0%",
            background: "#6BC0B1",
          },
          "90%": {
            width: "80%",
            background: " #6BC0B1",
            boxShadow: "0, 0, 3px, #6BC0B1",
          },
        },
      },
      animation: {
        progress100: "progress100 5s linear",
        progress90: "progress90 5s linear",
        progress80: "progress80 5s linear",
      },
      colors: {
        "p-green": "#6bc0b1",
        "bg-main": "rgba(2, 9, 12, 1)",
      },
      fontFamily: {
        cabin: ["Cabin"],
      },
      boxShadow: {
        "p-sh":
          "0px 0px 8px rgba(77, 255, 208, 0.74), inset 0px 0px 7px rgba(77, 255, 208, 0.74);",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
