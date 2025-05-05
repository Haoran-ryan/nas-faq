// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "nas-faq",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // Optimize for large screen performance
  build: {
    target: "es2015",
    minify: "terser",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion"],
          animations: ["framer-motion"],
        },
      },
    },
  },
  // Dev server settings
  server: {
    port: 3000,
    // Allow LAN access
    host: true,
  },
});
