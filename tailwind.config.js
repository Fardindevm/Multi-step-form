

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-aside" : "url('./assets/images/bg-sidebar-desktop.svg')", 
        "mobile-aside" : "url('./assets/images/bg-sidebar-mobile.svg')", 
      }
    },
  },
  plugins: [],
}

