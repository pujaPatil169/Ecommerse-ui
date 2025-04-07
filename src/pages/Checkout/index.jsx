import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../features/order/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';
import Confirmation from './Confirmation';
import { Alert, CircularProgress } from '@mui/material';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { selectCurrentUser } from '../../features/auth/authSlice';

const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const user = useSelector(selectCurrentUser);
  const { items, total } = useSelector(state => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingForm, setShippingForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const validateShipping = () => {
    const newErrors = {};
    if (!shippingForm.firstName) newErrors.firstName = 'Required';
    if (!shippingForm.lastName) newErrors.lastName = 'Required';
    if (!shippingForm.address) newErrors.address = 'Required';
    if (!shippingForm.city) newErrors.city = 'Required';
    if (!shippingForm.state) newErrors.state = 'Required';
    if (!shippingForm.postalCode) newErrors.postalCode = 'Required';
    if (!shippingForm.country) newErrors.country = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!paymentForm.cardNumber) newErrors.cardNumber = 'Required';
    if (!paymentForm.expiryDate) newErrors.expiryDate = 'Required';
    if (!paymentForm.cvv) newErrors.cvv = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingChange = (e) => {
    setShippingForm({
      ...shippingForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value
    });
  };

  const dispatch = useDispatch();
  const { error, status } = useSelector(state => state.order);

  const handleNext = async () => {
    if (activeStep === 0 && !validateShipping()) return;
    if (activeStep === 1 && !validatePayment()) return;
    
    if (activeStep === steps.length - 1) {
      const order = {
        items,
        subtotal: total,
        total,
        shipping: shippingForm,
        payment: paymentForm
      };
      const result = await dispatch(createOrder(order));
      if (createOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === steps.length) {
      // If on confirmation page, go back to review step
      setActiveStep(steps.length - 1);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const order = useSelector(state => state.order.orders[0]);
  if (activeStep === steps.length) {
    return <Confirmation order={order} />;
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {activeStep === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={shippingForm.firstName}
                      onChange={handleShippingChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={shippingForm.lastName}
                      onChange={handleShippingChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      value={shippingForm.address}
                      onChange={handleShippingChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      label="Address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="city"
                      value={shippingForm.city}
                      onChange={handleShippingChange}
                      error={!!errors.city}
                      helperText={errors.city}
                      label="City"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="state"
                      value={shippingForm.state}
                      onChange={handleShippingChange}
                      error={!!errors.state}
                      helperText={errors.state}
                      label="State/Province"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="postalCode"
                      value={shippingForm.postalCode}
                      onChange={handleShippingChange}
                      error={!!errors.postalCode}
                      helperText={errors.postalCode}
                      label="Postal Code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="country"
                      value={shippingForm.country}
                      onChange={handleShippingChange}
                      error={!!errors.country}
                      helperText={errors.country}
                      label="Country"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeStep === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                <TextField
                  fullWidth
                  name="cardNumber"
                  value={paymentForm.cardNumber}
                  onChange={handlePaymentChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  label="Card Number"
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="expiryDate"
                      value={paymentForm.expiryDate}
                      onChange={handlePaymentChange}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
                      label="Expiry Date"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handlePaymentChange}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                      label="CVV"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeStep === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Review Your Order
                </Typography>
                <List>
                  {items.map(item => (
                    <ListItem key={item.id}>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity}`}
                      />
                      <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                    </ListItem>
                  ))}
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Total" />
                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List>
                {items.map(item => (
                  <ListItem key={item.id} sx={{ py: 1 }}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Qty: ${item.quantity}`}
                    />
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="Subtotal" />
                  <Typography>${total.toFixed(2)}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="Shipping" />
                  <Typography>$0.00</Typography>
                </ListItem>
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="Tax" />
                  <Typography>$0.00</Typography>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem sx={{ py: 1 }}>
                  <ListItemText primary="Total" />
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={status === 'loading'}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
          {status === 'loading' && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
