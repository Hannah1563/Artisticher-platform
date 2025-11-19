module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#E9D8FD',
          DEFAULT: '#6B46C1',
          dark: '#4C51BF',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};