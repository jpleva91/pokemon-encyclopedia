import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { analogApiMiddleware } from '@analogjs/platform';

export default defineConfig({
  build: {
    target: 'es2022',
  },
  plugins: [
    analog({
      apiPrefix: 'api',
      vite: {
        inlineStylesExtension: 'scss',
      },
      nitro: {
        preset: 'node-server',
        output: {
          dir: 'dist/analog',
        },
      },
    }),
  ],
  define: {
    'import.meta.vitest': 'undefined',
  },
  server: {
    middlewareMode: false,
    fs: {
      allow: ['.'],
    },
  },
  optimizeDeps: {
    include: ['@angular/common', '@angular/platform-browser'],
  },
});