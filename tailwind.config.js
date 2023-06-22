/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css,scss}'],
  theme: {
    extend: {
      colors: {
        gray10: '#CFCFCF',
        gray20: '#585858',
        gray30: '#D9D9D9',
        gray40: '#ECECEC',
        'pastel-purple': '#C9A2FF',
        'green-card': '#C0E6C9',
        'red-card': '#E6C0C0',
        black2: '#2C2C2C',
        
      },
    },
  },
  plugins: [],
};
