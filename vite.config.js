import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: "path-browserify",
      fs: "browserfs/dist/shims/fs.js",
      stream: "stream-browserify",
      util: "util/",
    },
  },
});
