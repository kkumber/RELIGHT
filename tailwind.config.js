/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all React component files
  ],
  theme: {
    extend: {
      fontFamily: {
        'monaSans': ['Mona Sans', 'serif'],
      },
      colors: {
        'primaryRed': '#FF4550',
      }
    },
  },
  plugins: [],
};

