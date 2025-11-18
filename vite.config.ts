import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { ProxyOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createApiProxy(apiBaseUrl?: string): Record<string, ProxyOptions> | undefined {
  if (!apiBaseUrl || !apiBaseUrl.startsWith("http")) {
    return undefined;
  }

  try {
    const url = new URL(apiBaseUrl);
    const targetOrigin = `${url.protocol}//${url.host}`;

    return {
      "/api": {
        target: targetOrigin,
        changeOrigin: true,
        secure: url.protocol === "https:",
        headers: {
          origin: targetOrigin,
          referer: targetOrigin,
        },
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("origin", targetOrigin);
            proxyReq.setHeader("referer", targetOrigin);
          });
        },
      },
    };
  } catch (error) {
    console.warn("[vite] Invalid VITE_API_BASE_URL for proxy:", error);
    return undefined;
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = createApiProxy(env.VITE_API_BASE_URL);

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
      proxy,
    },
  };
});
