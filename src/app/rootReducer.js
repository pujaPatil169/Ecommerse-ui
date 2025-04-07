import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import productReducer from '../features/product/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  products: productReducer
});

export default rootReducer;
