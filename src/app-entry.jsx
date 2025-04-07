// Minimal entry point that imports your existing app
import('./firebase/authService.js') // Keep your existing Firebase setup
  .then(() => console.log('Firebase initialized'))
  .catch(err => console.error('Firebase init error:', err));
