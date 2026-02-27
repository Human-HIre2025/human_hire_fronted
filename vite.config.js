// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true }) // <-- this will open the report automatically
  ],
  build: {
    sourcemap: true,
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.log for production
        drop_debugger: true,
      },
      mangle: true, // Shortens variable names
    },
  },
});
