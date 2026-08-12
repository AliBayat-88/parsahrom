import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // تبدیل نقطه (.) به اسلش (/)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});