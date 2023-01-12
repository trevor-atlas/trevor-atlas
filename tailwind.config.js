/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{ts,js,tsx,jsx}'],
  theme: {
    extend: {
      animation: {
        shine: 'shine 1s'
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' }
        }
      }
    }
  },
  plugins: []
};
