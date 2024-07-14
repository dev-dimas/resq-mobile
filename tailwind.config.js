/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pjs-bold": ["PlusJakartaSans-Bold", "sans-serif"],
        "pjs-extrabold": ["PlusJakartaSans-ExtraBold", "sans-serif"],
        "pjs-extralight": ["PlusJakartaSans-ExtraLight", "sans-serif"],
        "pjs-light": ["PlusJakartaSans-Light", "sans-serif"],
        "pjs-medium": ["PlusJakartaSans-Medium", "sans-serif"],
        "pjs-regular": ["PlusJakartaSans-Regular", "sans-serif"],
        "pjs-semibold": ["PlusJakartaSans-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
