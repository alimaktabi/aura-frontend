/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        gray00: '#393939',
        gray10: '#CFCFCF',
        gray20: '#585858',
        gray30: '#D9D9D9',
        gray40: '#ECECEC',
        gray50: '#CDCDCD',
        purple00: '#C9A2FF',
        error: '#EB5E55',
        'pastel-purple': '#C9A2FF',
        'pastel-purple-25': '#C9A2FF40',
        'pastel-green': '#81CC91',
        'pastel-orange': '#FFAD8C',
        'pastel-blue': '#A5C4FF',
        'green-card': '#C0E6C9',
        'red-card': '#E6C0C0',
        black2: '#2C2C2C',
        pl1: '#C0E6C9',
        pl2: '#72BF83',
        nl1: '#E6C0C0',
        nl2: '#D39090',
        nl3: '#924848',
        'white-90-card': '#FFFFFFE6',
      },
    },
  },
  plugins: [],
};
