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
        glowFade: {
          '0%, 100%': {
            color: '#FF4550',
            textShadow: '0 0 10px #FF4550',
            opacity: '0.7',
          },
          '50%': {
            color: '#FFA500',
            textShadow: '0 0 20px #FFA500',
            opacity: '1',
          },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-in-out',
        slideRight: 'slideRight 0.5s ease-in-out',
        glowFade: 'glowFade 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};

