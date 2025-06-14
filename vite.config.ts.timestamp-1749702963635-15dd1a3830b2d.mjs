// vite.config.ts
import { URL, fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { nodePolyfills } from "file:///root/it-tools/node_modules/.pnpm/vite-plugin-node-polyfills@0.23.0_rollup@2.79.2_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0_/node_modules/vite-plugin-node-polyfills/dist/index.js";
import wasm from "file:///root/it-tools/node_modules/.pnpm/vite-plugin-wasm@3.4.1_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0_/node_modules/vite-plugin-wasm/exports/import.mjs";
import { splashScreen } from "file:///root/it-tools/node_modules/.pnpm/vite-plugin-splash-screen@0.2.0/node_modules/vite-plugin-splash-screen/dist/plugin/plugin.mjs";
import { defineConfig } from "file:///root/it-tools/node_modules/.pnpm/vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0/node_modules/vite/dist/node/index.js";
import vue from "file:///root/it-tools/node_modules/.pnpm/@vitejs+plugin-vue@4.3.2_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0__vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///root/it-tools/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.2_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0__vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import markdown from "file:///root/it-tools/node_modules/.pnpm/vite-plugin-vue-markdown@0.23.5_rollup@2.79.2_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0_/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import svgLoader from "file:///root/it-tools/node_modules/.pnpm/vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";
import { VitePWA } from "file:///root/it-tools/node_modules/.pnpm/vite-plugin-pwa@1.0.0_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0__w_vpe4drmgbkeq5ppt7ik7irtjqq/node_modules/vite-plugin-pwa/dist/index.js";
import AutoImport from "file:///root/it-tools/node_modules/.pnpm/unplugin-auto-import@0.16.4_@vueuse+core@10.11.1_vue@3.3.4__rollup@2.79.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///root/it-tools/node_modules/.pnpm/unplugin-vue-components@0.25.0_@babel+parser@7.27.2_rollup@2.79.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///root/it-tools/node_modules/.pnpm/unplugin-vue-components@0.25.0_@babel+parser@7.27.2_rollup@2.79.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Unocss from "file:///root/it-tools/node_modules/.pnpm/unocss@0.57.7_postcss@8.5.3_rollup@2.79.2_vite@4.4.9_@types+node@18.19.75_less@4.2.2_sass@1.83.4_terser@5.39.0_/node_modules/unocss/dist/vite.mjs";
import { configDefaults } from "file:///root/it-tools/node_modules/.pnpm/vitest@0.34.6_jsdom@22.1.0_less@4.2.2_playwright@1.50.1_sass@1.83.4_terser@5.39.0/node_modules/vitest/dist/config.js";
import Icons from "file:///root/it-tools/node_modules/.pnpm/unplugin-icons@0.17.4_@vue+compiler-sfc@3.2.47_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/vite.mjs";
import IconsResolver from "file:///root/it-tools/node_modules/.pnpm/unplugin-icons@0.17.4_@vue+compiler-sfc@3.2.47_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/resolver.mjs";
import VueI18n from "file:///root/it-tools/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.13.0_rollup@2.79.2_vue-i18n@9.14.4_vue@3.3.4_/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "/root/it-tools";
var __vite_injected_original_import_meta_url = "file:///root/it-tools/vite.config.ts";
var baseUrl = process.env.BASE_URL ?? "/";
var vite_config_default = defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [
        resolve(__vite_injected_original_dirname, "src/tools/*/locales/**"),
        resolve(__vite_injected_original_dirname, "locales/**")
      ],
      strictMessage: false,
      escapeHtml: true
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "vue-i18n",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
        }
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Icons({ compiler: "vue3" }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    markdown(),
    svgLoader(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 ** 2
      },
      strategies: "generateSW",
      manifest: {
        name: "IT Tools",
        description: "Aggregated set of useful tools for developers.",
        display: "standalone",
        lang: "fr-FR",
        start_url: `${baseUrl}?utm_source=pwa&utm_medium=pwa`,
        orientation: "any",
        theme_color: "#18a058",
        background_color: "#f1f5f9",
        icons: [
          {
            src: `${baseUrl}favicon-16x16.png`,
            type: "image/png",
            sizes: "16x16"
          },
          {
            src: `${baseUrl}favicon-32x32.png`,
            type: "image/png",
            sizes: "32x32"
          },
          {
            src: `${baseUrl}android-chrome-192x192.png`,
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: `${baseUrl}android-chrome-512x512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    Components({
      dirs: ["src/"],
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: "icon" })]
    }),
    Unocss(),
    nodePolyfills(),
    wasm(),
    splashScreen({
      logoSrc: "logo.svg",
      splashBg: "#101014"
    })
  ],
  base: baseUrl,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "node:fs/promises": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "node:fs": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "fs": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "@babel/core": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "isolated-vm": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "onnxruntime-node": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "unpdf/pdfjs": fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url)),
      "webcrypto-liner-shim": !process.env.VERCEL ? "webcrypto-liner-shim" : fileURLToPath(new URL("./src/_empty.ts", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(process.env.npm_package_version)
  },
  test: {
    exclude: [...configDefaults.exclude, "**/*.e2e.spec.ts"]
  },
  build: {
    target: "esnext",
    // sourcemap: false,
    minify: !process.env.VERCEL,
    reportCompressedSize: !process.env.VERCEL,
    // cssMinify: false,
    // modulePreload: false,
    rollupOptions: {
      external: ["regex", "./out/isolated_vm", "isolated-vm", "onnxruntime-node", "unpdf/pdfjs"],
      output: {
        format: "es"
        // manualChunks: (id) => {
        //   // if (id.includes('monaco-editor')) return 'monaco-editor';
        //   if (id.includes('tesseract.js')) return 'tesseract.js';
        //   if (id.includes('pdfjs')) return 'pdfjs';
        //   if (id.includes('unicode')) return 'unicode';
        //   // if (id.includes('transformers')) return 'transformers';
        //   // if (id.includes("node_modules")) {
        //   //   return "vendor";
        //   // }
        // },
        // sourcemapIgnoreList: (relativeSourcePath) => {
        //   const normalizedPath = path.normalize(relativeSourcePath);
        //   return normalizedPath.includes("node_modules");
        // },
      },
      cache: false
    }
  },
  optimizeDeps: {
    include: ["isolated-vm", "pdfjs-dist", "onnxruntime-node", "unpdf", "unpdf/pdfjs", ...process.env.VERCEL ? ["webcrypto-liner-shim"] : []],
    // optionally specify dependency name
    esbuildOptions: {
      supported: {
        "top-level-await": true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9pdC10b29sc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvaXQtdG9vbHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvaXQtdG9vbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5pbXBvcnQgd2FzbSBmcm9tICd2aXRlLXBsdWdpbi13YXNtJztcbmltcG9ydCB7IHNwbGFzaFNjcmVlbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zcGxhc2gtc2NyZWVuXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCBtYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWFya2Rvd24nO1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IHsgY29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJztcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJztcbmltcG9ydCBWdWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnO1xuXG5jb25zdCBiYXNlVXJsID0gcHJvY2Vzcy5lbnYuQkFTRV9VUkwgPz8gJy8nO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZUkxOG4oe1xuICAgICAgcnVudGltZU9ubHk6IHRydWUsXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXG4gICAgICBmdWxsSW5zdGFsbDogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdG9vbHMvKi9sb2NhbGVzLyoqJyksXG4gICAgICAgIHJlc29sdmUoX19kaXJuYW1lLCAnbG9jYWxlcy8qKicpLFxuICAgICAgXSxcbiAgICAgIHN0cmljdE1lc3NhZ2U6IGZhbHNlLFxuICAgICAgZXNjYXBlSHRtbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgIHtcbiAgICAgICAgICAnbmFpdmUtdWknOiBbJ3VzZURpYWxvZycsICd1c2VNZXNzYWdlJywgJ3VzZU5vdGlmaWNhdGlvbicsICd1c2VMb2FkaW5nQmFyJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBJY29ucyh7IGNvbXBpbGVyOiAndnVlMycgfSksXG4gICAgdnVlKHtcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICB9KSxcbiAgICB2dWVKc3goKSxcbiAgICBtYXJrZG93bigpLFxuICAgIHN2Z0xvYWRlcigpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiAxMCAqIDEwMjQgKiogMixcbiAgICAgIH0sXG4gICAgICBzdHJhdGVnaWVzOiAnZ2VuZXJhdGVTVycsXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnSVQgVG9vbHMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0FnZ3JlZ2F0ZWQgc2V0IG9mIHVzZWZ1bCB0b29scyBmb3IgZGV2ZWxvcGVycy4nLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGxhbmc6ICdmci1GUicsXG4gICAgICAgIHN0YXJ0X3VybDogYCR7YmFzZVVybH0/dXRtX3NvdXJjZT1wd2EmdXRtX21lZGl1bT1wd2FgLFxuICAgICAgICBvcmllbnRhdGlvbjogJ2FueScsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzE4YTA1OCcsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZjFmNWY5JyxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IGAke2Jhc2VVcmx9ZmF2aWNvbi0xNngxNi5wbmdgLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBzaXplczogJzE2eDE2JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogYCR7YmFzZVVybH1mYXZpY29uLTMyeDMyLnBuZ2AsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMzJ4MzInLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBgJHtiYXNlVXJsfWFuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nYCxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogYCR7YmFzZVVybH1hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ2AsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFsnc3JjLyddLFxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKSwgSWNvbnNSZXNvbHZlcih7IHByZWZpeDogJ2ljb24nIH0pXSxcbiAgICB9KSxcbiAgICBVbm9jc3MoKSxcbiAgICBub2RlUG9seWZpbGxzKCksXG4gICAgd2FzbSgpLFxuICAgIHNwbGFzaFNjcmVlbih7XG4gICAgICBsb2dvU3JjOiAnbG9nby5zdmcnLFxuICAgICAgc3BsYXNoQmc6ICcjMTAxMDE0JyxcbiAgICB9KSxcbiAgXSxcbiAgYmFzZTogYmFzZVVybCxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdub2RlOmZzL3Byb21pc2VzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9fZW1wdHkudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdub2RlOmZzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9fZW1wdHkudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdmcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvX2VtcHR5LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnQGJhYmVsL2NvcmUnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL19lbXB0eS50cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgJ2lzb2xhdGVkLXZtJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9fZW1wdHkudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICdvbm54cnVudGltZS1ub2RlJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9fZW1wdHkudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICd1bnBkZi9wZGZqcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvX2VtcHR5LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAnd2ViY3J5cHRvLWxpbmVyLXNoaW0nOiAhcHJvY2Vzcy5lbnYuVkVSQ0VMID8gJ3dlYmNyeXB0by1saW5lci1zaGltJyA6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvX2VtcHR5LnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ2ltcG9ydC5tZXRhLmVudi5QQUNLQUdFX1ZFUlNJT04nOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCAnKiovKi5lMmUuc3BlYy50cyddLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgLy8gc291cmNlbWFwOiBmYWxzZSxcbiAgICBtaW5pZnk6ICFwcm9jZXNzLmVudi5WRVJDRUwsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6ICFwcm9jZXNzLmVudi5WRVJDRUwsXG4gICAgLy8gY3NzTWluaWZ5OiBmYWxzZSxcbiAgICAvLyBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogWydyZWdleCcsICcuL291dC9pc29sYXRlZF92bScsICdpc29sYXRlZC12bScsICdvbm54cnVudGltZS1ub2RlJywgJ3VucGRmL3BkZmpzJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZm9ybWF0OiAnZXMnLFxuICAgICAgICAvLyBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAvLyAgIC8vIGlmIChpZC5pbmNsdWRlcygnbW9uYWNvLWVkaXRvcicpKSByZXR1cm4gJ21vbmFjby1lZGl0b3InO1xuICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcygndGVzc2VyYWN0LmpzJykpIHJldHVybiAndGVzc2VyYWN0LmpzJztcbiAgICAgICAgLy8gICBpZiAoaWQuaW5jbHVkZXMoJ3BkZmpzJykpIHJldHVybiAncGRmanMnO1xuICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcygndW5pY29kZScpKSByZXR1cm4gJ3VuaWNvZGUnO1xuICAgICAgICAvLyAgIC8vIGlmIChpZC5pbmNsdWRlcygndHJhbnNmb3JtZXJzJykpIHJldHVybiAndHJhbnNmb3JtZXJzJztcbiAgICAgICAgLy8gICAvLyBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgLy8gICAvLyAgIHJldHVybiBcInZlbmRvclwiO1xuICAgICAgICAvLyAgIC8vIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gc291cmNlbWFwSWdub3JlTGlzdDogKHJlbGF0aXZlU291cmNlUGF0aCkgPT4ge1xuICAgICAgICAvLyAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gcGF0aC5ub3JtYWxpemUocmVsYXRpdmVTb3VyY2VQYXRoKTtcbiAgICAgICAgLy8gICByZXR1cm4gbm9ybWFsaXplZFBhdGguaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIik7XG4gICAgICAgIC8vIH0sXG4gICAgICB9LFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsnaXNvbGF0ZWQtdm0nLCAncGRmanMtZGlzdCcsICdvbm54cnVudGltZS1ub2RlJywgJ3VucGRmJywgJ3VucGRmL3BkZmpzJywgLi4uKHByb2Nlc3MuZW52LlZFUkNFTCA/IFsnd2ViY3J5cHRvLWxpbmVyLXNoaW0nXSA6IFtdKV0sIC8vIG9wdGlvbmFsbHkgc3BlY2lmeSBkZXBlbmRlbmN5IG5hbWVcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgc3VwcG9ydGVkOiB7XG4gICAgICAgICd0b3AtbGV2ZWwtYXdhaXQnOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTROLFNBQVMsS0FBSyxxQkFBcUI7QUFDL1AsU0FBUyxlQUFlO0FBQ3hCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUU3QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sY0FBYztBQUNyQixPQUFPLGVBQWU7QUFDdEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8s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bUIsd0NBQWUsQ0FBQztBQUFBLE1BQzdFLFdBQVcsY0FBYyxJQUFJLElBQUksbUJBQW1CLHdDQUFlLENBQUM7QUFBQSxNQUNwRSxNQUFNLGNBQWMsSUFBSSxJQUFJLG1CQUFtQix3Q0FBZSxDQUFDO0FBQUEsTUFDL0QsZUFBZSxjQUFjLElBQUksSUFBSSxtQkFBbUIsd0NBQWUsQ0FBQztBQUFBLE1BQ3hFLGVBQWUsY0FBYyxJQUFJLElBQUksbUJBQW1CLHdDQUFlLENBQUM7QUFBQSxNQUN4RSxvQkFBb0IsY0FBYyxJQUFJLElBQUksbUJBQW1CLHdDQUFlLENBQUM7QUFBQSxNQUM3RSxlQUFlLGNBQWMsSUFBSSxJQUFJLG1CQUFtQix3Q0FBZSxDQUFDO0FBQUEsTUFDeEUsd0JBQXdCLENBQUMsUUFBUSxJQUFJLFNBQVMseUJBQXlCLGNBQWMsSUFBSSxJQUFJLG1CQUFtQix3Q0FBZSxDQUFDO0FBQUEsSUFDbEk7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixtQ0FBbUMsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxFQUNuRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUyxDQUFDLEdBQUcsZUFBZSxTQUFTLGtCQUFrQjtBQUFBLEVBQ3pEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUVSLFFBQVEsQ0FBQyxRQUFRLElBQUk7QUFBQSxJQUNyQixzQkFBc0IsQ0FBQyxRQUFRLElBQUk7QUFBQTtBQUFBO0FBQUEsSUFHbkMsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFNBQVMscUJBQXFCLGVBQWUsb0JBQW9CLGFBQWE7QUFBQSxNQUN6RixRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BZVY7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGVBQWUsY0FBYyxvQkFBb0IsU0FBUyxlQUFlLEdBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLENBQUU7QUFBQTtBQUFBLElBQzFJLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLFFBQ1QsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
