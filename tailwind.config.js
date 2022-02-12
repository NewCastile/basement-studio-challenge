module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        translucent: {
          light: "#FFF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
