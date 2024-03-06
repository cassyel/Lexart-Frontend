/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '400px',
      s: '500px',
      md: '768px',
      m: '1024px',
    },
  },
  plugins: [],
};
