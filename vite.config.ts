import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/My-Portfolio/",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1150 },
});
