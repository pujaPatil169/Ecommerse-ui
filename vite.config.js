// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   server: {
//     port: 5173,
//     strictPort: true
//   }
// });
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ecommerse-ui/', 
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import ghPages from 'vite-plugin-gh-pages';

// export default defineConfig({
//   plugins: [react(), ghPages()],
//   base: '/Ecommerse-ui/',
// });
