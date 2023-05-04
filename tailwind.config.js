/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        plH1: "64px",
        plH2: "37.43px",
        plH3: "20px",
        plH4: "14.56px",
      },
      fontFamily: {
        Gilroy: ["Gilroy", "sans-serif"],
        GilroyBold: ["Gilroy-Bold", "sans-serif"],
        GilroySemiBold: ["Gilroy-Semibold", "sans-serif"],
      },
      colors: {
        plBlue: "#222057",
        plGray: "#939393",
        plBlack: "#232323",
        plOrange: "#F8991D",
      },
    },
  },
  plugins: [],
};
