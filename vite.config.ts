import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Emotion css prop 활성화를 위한 jsxImportSource 설정
      jsxImportSource: "@emotion/react",
    }),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      "@styles": resolve(__dirname, "src/styles"),
      shared: resolve(__dirname, "src/shared"),
    },
  },
  server: {
    port: 5175,
  },
});
