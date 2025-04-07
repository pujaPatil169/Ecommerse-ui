import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const authService = {
  // Email/password auth
  async signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  async signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  // Google auth
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  },

  // Sign out
  async signOut() {
    return signOut(auth);
  }
};

export default authService;
