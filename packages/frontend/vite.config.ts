/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export default defineConfig(({ mode }) =>({
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      wasm(),
      topLevelAwait(),
    ],
    build: {
      target: "esnext",
      assetsInlineLimit: 0,
      // module preloading generated circular dependency between main chunk and the dynamic chunk with WebAassembly bindings
      modulePreload: false
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        ...(mode === 'development'
          ? {
              '@web-photo-editor/as-pixels-processor/all': '@web-photo-editor/as-pixels-processor/dev-all',
              '@web-photo-editor/as-pixels-processor/inline': '@web-photo-editor/as-pixels-processor/dev-inline',
              '@web-photo-editor/as-pixels-processor/simd': '@web-photo-editor/as-pixels-processor/dev-simd',
            }
          : {})
      },
    },
    test: {
      coverage: {
        all: true,
      },
    },
  }));
