import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/orderApi';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  orders: [],
  status: 'idle',
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create order';
      });
  }
});

export const { 
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  clearOrderStatus
} = orderSlice.actions;

export default orderSlice.reducer;
