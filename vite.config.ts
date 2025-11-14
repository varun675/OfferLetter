import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
 

// Base path for GitHub Pages
export default defineConfig(({ mode }) => {
  // For GitHub Pages with repo name 'OfferLetter'
  const isProduction = mode === 'production';
  const base = isProduction ? '/OfferLetter/' : '/';
  
  return {
    base,
    plugins: [
      react()
    ],
    root: "client",
    publicDir: "public",  // Relative to root directory
    build: {
      outDir: "../dist/public",
      emptyOutDir: true,
      sourcemap: false,
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
        strict: false,  // Allow serving from outside root
      },
    },
  };
});
