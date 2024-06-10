/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode using a class
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "hsl(0, 0%, 100%)", // Light mode background color
          dark: "hsl(0, 0%, 10%)", // Dark mode background color
        },
        foreground: {
          light: "hsl(0, 0%, 0%)", // Light mode text color
          dark: "hsl(0, 0%, 90%)", // Dark mode text color
        },
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        "custom-blue": "#072d48",
      },
      backgroundImage: {
        "finance-gradient":
          "linear-gradient(to right, #38ada9, #3c6382, #0a3d62)",
      },
      boxShadow: {
        "custom-strong": "0 10px 15px rgba(0, 0, 0, 0.6)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}
