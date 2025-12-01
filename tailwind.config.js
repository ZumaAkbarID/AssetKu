/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          750: '#2d3748', // Custom color from original CSS if needed, or close approximation
          950: '#030712', // Tailwind default but ensuring it's available
        }
      }
    },
  },
  plugins: [],
}
