// @ts-nocheck
import { rmSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron, { onstart } from 'vite-plugin-electron';
// import optimizer from 'vite-plugin-optimizer';
import Unocss from 'unocss/vite';
import pkg from './package.json';

rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true }); // v14.14.0
// let getReplacer = () => {
//   let externalModels = [
//     'electron',
//     'os',
//     'fs',
//     'path',
//     'events',
//     'exec',
//     'child_process',
//     'crypto',
//     'http',
//     'buffer',
//     'url',
//   ];
//   let result = {};
//   for (let item of externalModels) {
//     result[item] = () => ({
//       find: new RegExp(`^${item}$`),
//       code: `const ${item} = require('${item}');export { ${item} as default }`,
//     });
//   }
//   return result;
// };
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      styles: path.join(__dirname, 'src/assets/styles'),
    },
  },
  plugins: [
    // optimizer(getReplacer()),
    react(),
    Unocss({
      shortcuts: [
        { 'input-file': 'opacity-0 absolute left-0 top-0 cursor-pointer w-102px h-32px z-1' },
      ],
    }),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            // For Debug
            sourcemap: true,
            outDir: 'dist/electron/main',
          },
          // Will start Electron via VSCode Debug
          plugins: [process.env.VSCODE_DEBUG ? onstart() : null],
        },
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          index: path.join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            // For Debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          },
        },
      },
      // Enables use of Node.js API in the Electron-Renderer
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {},
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        // 	"primary-color": "#1DA57A",
        // },
        javascriptEnabled: true,
        additionalData: `@import "@/styles/var.less";`,
      },
    },
  },
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOST,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
});
