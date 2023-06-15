/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryBlue: "#00AEEF",
        background: "#000F14",
        midnightGreen: "#7896A1",
        lightBlue: "#EAF6FF",
        grey: "#7896A1",
        "dark-blue": "#000F14",
        darkText: "#000F14",

        highlight: "#03fa85",
        deepBlue: "#001C25",
        cardBackground: "rgba(20, 29, 112, 0.13)",
        secondary: "rgb(33, 46, 66)",
      },
    },
  },
  plugins: [],
};
