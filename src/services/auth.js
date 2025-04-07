import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebaseConfig';

export const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential.user;
};

export const loginWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => 
  signInWithPopup(auth, googleProvider);

export const resetPassword = (email) => 
  sendPasswordResetEmail(auth, email);

export const logout = () => 
  signOut(auth);
