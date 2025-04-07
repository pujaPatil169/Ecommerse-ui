import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { clearOrderStatus } from '../../features/order/orderSlice';
import { 
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ order }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // Clear cart and reset order status when component unmounts
    return () => {
      dispatch(clearCart());
      dispatch(clearOrderStatus());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Order #{order.id}
          </Typography>
          <Typography paragraph>
            A confirmation email has been sent to {user?.email}.
          </Typography>

          <List>
            {order.items.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <ListItemText primary="Subtotal" />
              <Typography>${order.subtotal.toFixed(2)}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Shipping" />
              <Typography>$0.00</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="Tax" />
              <Typography>$0.00</Typography>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="h6">${order.total.toFixed(2)}</Typography>
            </ListItem>
          </List>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Typography>
              {order.shipping.firstName} {order.shipping.lastName}
            </Typography>
            <Typography>{order.shipping.address}</Typography>
            <Typography>
              {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
            </Typography>
            <Typography>{order.shipping.country}</Typography>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
            >
              Continue Shopping
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;
