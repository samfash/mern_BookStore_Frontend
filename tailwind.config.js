/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#FAF6ED',
          200: '#F5ECD6',
          300: '#EFE2BF',
          400: '#E9D8A8',
          500: '#E3CE91',
        },
        chocolate: {
          50: '#F9F6F4',
          100: '#F3EDE9',
          200: '#E7DBD3',
          300: '#D4B9A7',
          400: '#C19780',
          500: '#A36F51',
          600: '#8A5A3F',
          700: '#6E4730',
          800: '#513621',
          900: '#3E2918',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }},
  },
  plugins: [],
}



