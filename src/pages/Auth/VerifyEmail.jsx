import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectCurrentUser,
  setEmailVerified
} from '../../features/auth/authSlice';
import { auth } from '../../firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { 
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';

const VerifyEmail = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setResendDisabled(true);
      let timer = 60;
      setCountdown(timer);
      
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer <= 0) {
          clearInterval(interval);
          setResendDisabled(false);
        }
      }, 1000);
    } catch (error) {
      alert(`Error resending verification email: ${error.message}`);
    }
  };

  useEffect(() => {
    if (user?.emailVerified) {
      dispatch(setEmailVerified(true));
      navigate('/');
    }
  }, [user, dispatch, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Verify Your Email Address
        </Typography>
        {user ? (
          <>
            <Typography paragraph>
              We've sent a verification email to {user.email}. 
              Please check your inbox and click the link to verify your account.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleResendVerification}
              disabled={resendDisabled}
              sx={{ mt: 2 }}
            >
              {resendDisabled ? `Resend in ${countdown}s` : 'Resend Verification Email'}
            </Button>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
