// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Optimized for LG STANDBYME touch screen
      fontSize: {
        // Larger text sizes for better readability on the large touch screen
        base: "1.125rem", // 18px
        lg: "1.25rem", // 20px
        xl: "1.375rem", // 22px
        "2xl": "1.625rem", // 26px
        "3xl": "2rem", // 32px
        "4xl": "2.5rem", // 40px
      },
      spacing: {
        // Better touch targets
        touch: "2.75rem", // 44px minimum for touch targets
      },
      minHeight: {
        touch: "2.75rem", // 44px minimum for touch targets
      },
      minWidth: {
        touch: "2.75rem", // 44px minimum for touch targets
      },
      borderRadius: {
        // More pronounced rounded corners for touch elements
        xl: "1rem", // 16px
        "2xl": "1.25rem", // 20px
        "3xl": "1.75rem", // 28px
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "card-expand": "cardExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        cardExpand: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      // Colors optimized for high contrast on the LG STANDBYME
      colors: {
        // Add any custom colors here
      },
    },
  },
  plugins: [],
};
