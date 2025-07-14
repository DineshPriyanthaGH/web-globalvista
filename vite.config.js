import { fileURLToPath, URL } from 'url';

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [],
}