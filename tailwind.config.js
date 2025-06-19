// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
   safelist: [
    'dark:bg-black', // 👈 add this if Tailwind purging it
    'bg-white',
    'bg-[#FF8C8C]',
    'dark:bg-[#111]',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}; 