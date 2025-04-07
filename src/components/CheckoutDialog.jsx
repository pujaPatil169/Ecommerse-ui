import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Box
} from '@mui/material';

const CheckoutDialog = ({ open, onClose, onCheckout, product }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle variant="h6" sx={{ fontWeight: 'bold' }}>
        My Order
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight="medium">
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Quantity</Typography>
          <Typography variant="body2">{product.quantity || 1}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2">Fit</Typography>
          <Typography variant="body2">Regular Fit</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ${(product.price * (product.quantity || 1)).toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          variant="contained" 
          fullWidth
          size="large"
          onClick={onCheckout}
          sx={{ 
            bgcolor: 'black',
            '&:hover': { bgcolor: 'grey.800' }
          }}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog;
