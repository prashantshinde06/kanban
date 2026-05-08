import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 3000,
    host: true,
    middlewareMode: false,
    // SPA fallback middleware
    middlewares: [
      (req, res, next) => {
        if (!req.url.startsWith("/api/") && !req.url.includes(".")) {
          req.url = "/";
        }
        next();
      },
    ],
  },
  preview: {
    port: 4173,
    host: true,
    // SPA fallback middleware for preview
    middlewares: [
      (req, res, next) => {
        if (!req.url.startsWith("/api/") && !req.url.includes(".")) {
          req.url = "/";
        }
        next();
      },
    ],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",

    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
      format: {
        comments: false,
      },
      mangle: true,
    },

    // Tree shaking
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        // Code splitting
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor";
            }
          }
        },

        // File naming with hash for cache busting
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",

        // Asset organization
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return "[name]-[hash][extname]";
          }

          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];

          if (/png|jpe?g|gif|svg|webp|ico/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|ttf|otf|eot/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          }
          if (ext === "css") {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
      },
    },

    // Performance settings
    cssCodeSplit: true,
    sourcemap: false,
    target: "esnext",
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,

    // Rollup output options
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    // Module preload
    modulePreload: {
      resolveFully: true,
    },

    // Polyfills
    polyfillModulePreload: true,
  },

  // Optimization
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["dist", "node_modules"],
  },

  // CSS configuration
  css: {
    postcss: "./postcss.config.js",
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  // Production-ready settings
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode || "production"),
    "process.env.APP_ENV": JSON.stringify(mode || "production"),
  },
}));
