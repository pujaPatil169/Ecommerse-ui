import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/Ecommerse-ui/',
  server: {
    port: 5173,
    strictPort: true
  }
});
