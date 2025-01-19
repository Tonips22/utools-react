/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,txs}"
  ],
  theme: {
    colors: {
      'bg': 'var(--bg)',
      'dark': 'var(--dark)',
      'blue': 'var(--blue)',
      'pink': 'var(--pink)',
      'purple': 'var(--purple)',
      'white': 'var(--white)',
      'light-blue': 'var(--light-blue)',
    },

    fontFamily:{
      'primary-font': 'var(--primary-font)',
      'secondary-font': 'var(--secondary-font)'
    },

    extend: {},
  },
  plugins: [],
}

