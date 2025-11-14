import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Base path for GitHub Pages
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/OfferLetter/' : '/';
  
  return {
    base,
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID ? [
        require("@replit/vite-plugin-cartographer").default(),
        require("@replit/vite-plugin-dev-banner").default()
      ] : [])
    ],
    root: "./client",
    publicDir: "./client/public",
    build: {
      outDir: "../dist/public",
      emptyOutDir: true,
      rollupOptions: {
        input: "./client/index.html",
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name?.split('.').at(1) || '';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'client/src') },
        { find: '@shared', replacement: path.resolve(__dirname, 'shared') },
        { find: '@assets', replacement: path.resolve(__dirname, 'attached_assets') },
      ]
    },
    server: {
      fs: {
        strict: true,
      },
    },
  };
});
