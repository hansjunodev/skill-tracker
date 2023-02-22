/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        kbd: "0 2px 1px rgba(0, 0, 0, .4), 0 2px 0 0 rgba(255, 255, 255, .7) inset",
      },
    },
  },
  plugins: [],
};
