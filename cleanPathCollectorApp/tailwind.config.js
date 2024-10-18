/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#57912C',
        Secondary: '#F5FBE0',
        swhite: '#FAFDFF',
        tertiary:'#EEEEEE',
      },
    },
  },
  plugins: [],
}

