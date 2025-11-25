import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => {
  return {
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
      port: 5173,
      // 로컬 개발 시 백엔드 API 프록시 (CORS 우회)
      proxy: {
        "/api": {
          target: "https://www.recyclean-server.com",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    test: {
      globals: true,
      environment: "node",
      include: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "tests/**/*.test.{ts,tsx}",
        "tests/**/*.spec.{ts,tsx}",
      ],
      exclude: [...configDefaults.exclude, "e2e/**"],
    },
  };
});
