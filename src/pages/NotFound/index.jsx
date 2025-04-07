import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './styles.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        color="primary"
        sx={{ mt: 3 }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
