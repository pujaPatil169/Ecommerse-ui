import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './index.css';
import store from './app/store';
import router from './routes/AppRoutes';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <CssBaseline/>
      <RouterProvider router={router} /> 
    </Provider>
  </StrictMode>,
)
