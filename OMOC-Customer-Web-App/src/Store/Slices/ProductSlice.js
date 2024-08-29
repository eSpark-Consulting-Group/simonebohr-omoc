import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductSublyApi from "../../helper/ProductApi";

const initialState = {
  productList: {},
  isLoading: false,
  success: false,
  finalCartList: {},
};

// Thunk for user sign-up
export const productList = createAsyncThunk(
  "productList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ProductSublyApi.fetchProductList(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    deleteCartStorage: (state) => {
      state.finalCartList = {};
      state.productList = {};
    },
    cartProductList: (state, action) => {
      state.finalCartList = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ------Builder for Signup-------
    builder.addCase(productList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(productList.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.productList = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(productList.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { cartProductList, deleteCartStorage } = productListSlice.actions;
export default productListSlice.reducer;
