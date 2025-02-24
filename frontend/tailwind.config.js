/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px", // 📱 Petits téléphones
        sm: "480px", // 📱 Mobiles normaux
        md: "768px", // 🖥️ Tablettes
        lg: "1024px", // 💻 Ordinateurs
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-purple-500", "hover:bg-purple-700",
    "bg-gray-500", "hover:bg-gray-700",
    "text-white", "text-gray-400"
  ]
};