/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
      },
      boxShadow: {
        soft: '0 14px 35px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
