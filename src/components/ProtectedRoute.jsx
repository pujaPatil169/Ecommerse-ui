import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { 
  selectCurrentUser, 
  selectAuthStatus,
  setEmailVerified
} from '../features/auth/authSlice';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  const authStatus = useSelector(selectAuthStatus);
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !user.emailVerified) {
      const checkEmailVerification = async () => {
        setIsCheckingVerification(true);
        try {
          await user.reload();
          if (user.emailVerified) {
            dispatch(setEmailVerified(true));
          }
        } catch (error) {
          console.error('Error checking email verification:', error);
        } finally {
          setIsCheckingVerification(false);
        }
      };
      checkEmailVerification();
    }
  }, [user, dispatch]);

  if (authStatus === 'loading' || isCheckingVerification) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

export default ProtectedRoute;
