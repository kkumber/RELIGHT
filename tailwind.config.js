/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all React component files
  ],
  darkMode: "class", // or "media"
  theme: {
    extend: {
      fontFamily: {
        'monaSans': ['Mona Sans', 'serif'],
      },
      colors: {
        'primaryRed': '#FF4550',
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-in-out',
        slideRight: 'slideRight 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

