/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#133215',
          700: '#1a4520',
          500: '#2a6b32',
          400: '#92B775',
          300: '#a8c892',
          200: '#c4e0b3',
          100: '#e8f5e1',
          50: '#f4faf1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
