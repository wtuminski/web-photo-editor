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
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        ...(mode === 'development'
          ? {
              '@web-photo-editor/as-pixels-processor': '@web-photo-editor/as-pixels-processor/dev'
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
