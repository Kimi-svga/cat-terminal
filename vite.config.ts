import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  root: 'demo',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
}); 
