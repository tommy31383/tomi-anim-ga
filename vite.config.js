import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { getSpritesheetsPlugin } from "./vite/get-spritesheets-plugin.js";
import { vitePluginPreviewServeDistSpritesheets } from "./vite/vite-plugin-preview-serve-dist-spritesheets.js";
import { vitePluginBundledCssAfterBulma } from "./vite/vite-plugin-bundled-css-after-bulma.js";
import { vitePluginPurgeCriticalCss } from "./vite/vite-plugin-purge-critical-css.js";
import { vitePluginMetadataModulePreload } from "./vite/vite-plugin-metadata-modulepreload.js";
import {
  itemMetadataCodeSplittingGroups,
  itemMetadataPlugins,
  itemMetadataResolveAliases,
} from "./vite/wiring.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Item-metadata pipeline (Commit 4): `vite/wiring.js` registers the pre-plugin,
 * `resolve.alias`, and Rolldown chunk groups for generated metadata modules. Testem’s Vite
 * middleware loads this file via `configFile` so browser tests get the same behavior. Other
 * plugins stay below.
 */

export default defineConfig(({ command }) => ({
  base: "./",
  publicDir: false,
  logLevel: "info",
  resolve: {
    alias: [
      {
        find: "mocha-globals",
        replacement: path.resolve(__dirname, "tests/bdd-globals.js"),
      },
      ...itemMetadataResolveAliases(),
    ],
  },
  build: {
    rolldownOptions: {
      input: {
        main: "index.html",
        bouncer: "bouncer/index.html",
      },
      output: {
        codeSplitting: {
          minSize: 20000,
          maxSize: 200000,
          minModuleSize: 20000,
          maxModuleSize: 200000,
          groups: [
            {
              name: "vendor",
              test: /node_modules/,
              priority: 10,
            },
            ...itemMetadataCodeSplittingGroups(),
          ],
        },
      },
    },
    target: "esnext",
    emptyOutDir: false, // see npm run prebuild
    chunkSizeWarningLimit: 1000,
  },
  css: {
    target: false,
    preprocessorOptions: {
      scss: { quietDeps: true },
      sass: { quietDeps: true },
    },
  },
  plugins: [
    // Copy `bouncer/fx-packs/` (CC0 sprite packs) into the build output so
    // the deployed bouncer can fetch them via relative URL. Vite's input
    // handler only emits the HTML/JS, not sibling static asset folders.
    {
      name: "copy-bouncer-fx-packs",
      apply: "build",
      closeBundle() {
        const src = path.resolve(__dirname, "bouncer/fx-packs");
        const dst = path.resolve(__dirname, "dist/bouncer/fx-packs");
        if (!fs.existsSync(src)) return;
        fs.cpSync(src, dst, { recursive: true });
      },
    },
    // Dev server: serve fx-packs via middleware so /bouncer/fx-packs/...
    // works the same as in production build.
    {
      name: "serve-bouncer-fx-packs",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use("/bouncer/fx-packs", (req, res, next) => {
          const cleanPath = (req.url || "").split("?")[0];
          const filePath = path.join(__dirname, "bouncer/fx-packs", cleanPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const types = { ".png": "image/png", ".webp": "image/webp", ".md": "text/markdown" };
            res.setHeader("Content-Type", types[ext] || "application/octet-stream");
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      },
    },
    vitePluginPreviewServeDistSpritesheets(),
    ...itemMetadataPlugins(command),
    vitePluginMetadataModulePreload(),
    vitePluginBundledCssAfterBulma(),
    getSpritesheetsPlugin(command),
    vitePluginPurgeCriticalCss(),
  ],
}));
