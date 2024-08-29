import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosConfig from "../../../utils/api";

const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (shpoId: string) => {
    try {
      if (!!shpoId) {
        const response = await AxiosConfig.get(`/dashboard?shopId=${shpoId}`);
        return response.data;
      }
    } catch (error) {
      console.log("error", JSON.stringify(error));
    }
  }
);

const OrdersSlice = createSlice({
  name: "odrers",
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export { fetchOrders };

export default OrdersSlice.reducer;
