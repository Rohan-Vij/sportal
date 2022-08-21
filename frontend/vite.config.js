import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "tailwind.config.cjs": path.resolve(__dirname, "tailwind.config.cjs"),
    },
  },
  optimizeDeps: {
    include: [
      'tailwind.config.cjs',
    ]
  }
});
