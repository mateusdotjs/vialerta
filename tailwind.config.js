/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        metro: "url('/src/assets/metro-bg.jpg')",
        blur: "url('/src/assets/bbblurry.svg')"
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-40px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        slide: 'slide .5s'
      }
    },
  },
  plugins: [],
};
