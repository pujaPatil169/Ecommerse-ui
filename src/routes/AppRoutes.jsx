import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/Cart';
import CheckoutPage from '../pages/Checkout';
import LoginPage from '../pages/Auth/Login';
import SignupPage from '../pages/Auth/Signup';
import VerifyEmailPage from '../pages/Auth/VerifyEmail';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/Ecommerse-ui/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <CartPage /> },
      { 
        path: 'checkout', 
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        )
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
