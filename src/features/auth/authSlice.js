// Authentication slice with localStorage persistence
import { createSlice } from '@reduxjs/toolkit';
import { 
  auth,
  googleProvider
} from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification
} from 'firebase/auth';

// Load initial state from localStorage if available
const loadInitialState = () => {
  const storedAuth = localStorage.getItem('auth');
  return storedAuth ? JSON.parse(storedAuth) : {
    user: null,
    status: 'idle',
    error: null,
    isEmailVerified: false
  };
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('Setting user:', action.payload);
      state.user = action.payload;
      state.isEmailVerified = action.payload?.emailVerified || false;
      localStorage.setItem('auth', JSON.stringify(state));
      console.log('Updated auth state:', state);
    },
    setEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
    setAuthStatus: (state, action) => {
      state.status = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem('auth');
    }
  }
});

// [Rest of the file remains unchanged...]
export const signUpWithEmail = (email, password) => async (dispatch) => {
    try {
      dispatch(setAuthStatus('loading'));
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user);
      dispatch(setUser(user));
      dispatch(setAuthStatus('succeeded'));
    } catch (error) {
      let errorMessage = 'Authentication failed';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message;
      }
      dispatch(setAuthError(errorMessage));
      dispatch(setAuthStatus('failed'));
  }
};

export const signInWithEmail = (email, password) => async (dispatch) => {
  try {
    dispatch(setAuthStatus('loading'));
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(user));
    dispatch(setAuthStatus('succeeded'));
    } catch (error) {
      let errorMessage = 'Authentication failed';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      dispatch(setAuthError(errorMessage));
      dispatch(setAuthStatus('failed'));
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch(setAuthStatus('loading'));
    const { user } = await signInWithPopup(auth, googleProvider);
    dispatch(setUser(user));
    dispatch(setAuthStatus('succeeded'));
  } catch (error) {
    dispatch(setAuthError(error.message));
    dispatch(setAuthStatus('failed'));
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearAuth());
  } catch (error) {
    dispatch(setAuthError(error.message));
  }
};

export const { setUser, setEmailVerified, setAuthStatus, setAuthError, clearAuth } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
