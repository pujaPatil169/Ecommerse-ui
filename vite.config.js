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
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/your-repo-name/', // must match GitHub repo name
});
