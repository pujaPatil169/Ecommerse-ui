import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById, getProductsByCategory, getCategories } from '../../api/platziApi';

const initialState = {
  products: [],
  productDetails: null,
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (categoryId = null) => {
    const response = categoryId 
      ? await getProductsByCategory(categoryId)
      : await getProducts();
    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId) => {
    const response = await getProductById(productId);
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearProductDetails } = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectProductDetails = (state) => state.products.productDetails;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productSlice.reducer;
