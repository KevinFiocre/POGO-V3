/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-purple-500", "hover:bg-purple-700",
    "bg-gray-500", "hover:bg-gray-700",
    "text-white", "text-gray-400"
  ]
};