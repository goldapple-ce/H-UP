import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: [
      { find: '@api', replacement: '/src/@core/api' },
      { find: '@hook', replacement: '/src/@core/hooks' },
      { find: '@util', replacement: '/src/@core/utils' },
      { find: '@asset', replacement: '/src/assets' },
      { find: '@component', replacement: '/src/components' },
      { find: '@constant', replacement: '/src/constants' },
      { find: '@data', replacement: '/src/data' },
      { find: '@page', replacement: '/src/pages' },
      { find: '@recoil', replacement: '/src/recoil' },
      { find: '@styled', replacement: '/src/styled/component' },
      { find: 'node_modules', replacement: '/node_modules' },
    ],
  },
  build: {
    outDir: 'build/',
  },
});
