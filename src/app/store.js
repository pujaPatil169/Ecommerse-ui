import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const env = import.meta.env;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: env.MODE !== 'production',
});

export default store;
