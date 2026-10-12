import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built site work on GitHub Pages
// whatever the repository name is (user.github.io/<repo>/).
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", sourcemap: false }
});
