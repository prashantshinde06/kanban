import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "@/services/products";

/* ---------------- INITIAL STATE ---------------- */

const initialState = {
  products: [],
  loading: false,
  error: null,
};

/* ---------------- SLICE ---------------- */

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Pending
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      //  Error
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

/* ---------------- THUNK ---------------- */

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      console.log("Fetched products:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

/* ---------------- EXPORTS ---------------- */

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
