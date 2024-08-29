import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthSublyApi from "../../helper/AuthApi";

const initialState = {
  userDetails: {},
  isLoading: false,
  success: false,
};

// Thunk for user sign-up
export const sellerSignup = createAsyncThunk(
  "userSignup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthSublyApi.signUp(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for user Login
export const sellerLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthSublyApi.login(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for google Login and signup
export const sellerGoogleAuth = createAsyncThunk(
  "userGoogleAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthSublyApi.googleAuth(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userMediaSlice = createSlice({
  name: "userSignup",
  initialState,
  reducers: {
    deleteUserDetail: (state) => {
      state.userDetails = {};
    },
  },
  extraReducers: (builder) => {
    // ------Builder for Signup-------
    builder.addCase(sellerSignup.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sellerSignup.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(sellerSignup.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ===============Building for login==============
    builder.addCase(sellerLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sellerLogin.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(sellerLogin.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ================Butlding for google auth================
    builder.addCase(sellerGoogleAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sellerGoogleAuth.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(sellerGoogleAuth.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { deleteUserDetail } = userMediaSlice.actions;
export default userMediaSlice.reducer;
