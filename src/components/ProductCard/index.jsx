import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '../../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.css';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import CheckoutDialog from '../CheckoutDialog';

const ProductCard = ({ product }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const currentItem = cartItems.find(item => item.id === product.id) || { quantity: 0 };
  if (!product || !product.id) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
    setOpenAlert(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
    navigate('/cart');
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCheckout(true);
  };


  return (
    <>
      <CheckoutDialog
        open={openCheckout}
        onClose={() => setOpenCheckout(false)}
        onCheckout={() => {
          // Handle checkout logic
          navigate('/checkout');

        }}
        product={{...product, quantity: currentItem.quantity}}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionProps={{ direction: 'down' }}
        sx={{
          '& .MuiAlert-root': {
            animation: 'bounce 0.5s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '16px',
            '& .MuiAlert-icon': {
              fontSize: '28px',
              marginRight: '12px'
            }
          }
        }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: '#4caf50',
            color: 'white',
            '& .MuiSvgIcon-root': {
              color: 'white'
            }
          }}
          icon={false}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '12px' }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
            </svg>
            "{product.title}" has been added to your cart!
          </div>
        </Alert>
      </Snackbar>
      <Link to={`/products/${product.id}`} className={styles.card}>
        <IconButton 
          onClick={handleQuickAdd}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          <AddIcon color="primary" />
        </IconButton>
      <img 
        // src={product.image} 
        src={product.images[0]} 
        alt={product.title} 
        className={styles.image}
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {product.category?.name && (
          <p className={styles.category}>{product.category.name}</p>
        )}
        <div className={styles.buttons}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleAddToCart}
            className={styles.button}
            fullWidth
          >
            Add to Cart
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleBuyNow}
            className={styles.button}
            fullWidth
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ProductCard;
