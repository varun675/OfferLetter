import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
 

// Base path for GitHub Pages
export default defineConfig(({ mode }) => {
  // Always use /OfferLetter/ as base path for GitHub Pages
  const base = '/OfferLetter/';
  
  return {
    base,
    plugins: [
      react()
    ],
    root: "client",
    publicDir: "public",
    build: {
      outDir: "../dist/public",
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, "client/index.html"),
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
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      }
    },
    server: {
      fs: {
        strict: true,
      },
    },
  };
});
