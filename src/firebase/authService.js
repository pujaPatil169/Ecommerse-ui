// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   sendEmailVerification,
//   sendPasswordResetEmail
// } from 'firebase/auth';
// import { auth, googleProvider } from './firebaseConfig';

// export const AuthService = {
//   // Email/Password Authentication
//   async register(email, password) {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await sendEmailVerification(userCredential.user);
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   },

//   async login(email, password) {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Google Authentication
//   async loginWithGoogle() {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       return result.user;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Password Reset
//   async resetPassword(email) {
//     try {
//       await sendPasswordResetEmail(auth, email);
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Sign Out
//   async logout() {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       throw error;
//     }
//   }
// };



import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';

export const AuthService = {
  // Email/Password Authentication
  async register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  },

  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Google Authentication
  async loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  // Password Reset
  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  },

  // Sign Out
  async logout() {
    await signOut(auth);
  }
};
