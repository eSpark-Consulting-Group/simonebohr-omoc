import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthSublyApi from "../../helper/AuthApi";
import DashboardSublyApi from "../../helper/DashboardApi";

const initialState = {
  dashboard: {},
  isLoading: false,
  success: false,
  shopInfo: {},
};

// Thunk for user sign-up
export const fetchDashboard = createAsyncThunk(
  "dashboard",
  async (data, { rejectWithValue }) => {
    try {
      const response = await DashboardSublyApi.dashboardData(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    shopDetails: (state, action) => {
      state.shopInfo = action.payload;
    },
    deleteDashboardDetails: (state) => {
      state.dashboard = {};
      state.shopInfo = {};
    },
  },
  extraReducers: (builder) => {
    // ------Builder for Signup-------
    builder.addCase(fetchDashboard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.dashboard = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(fetchDashboard.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { shopDetails, deleteDashboardDetails } = dashboardSlice.actions;
export default dashboardSlice.reducer;
