import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthSublyApi from "../../helper/AuthApi";

const initialState = {
  userDetails: {},
  isLoading: false,
  success: false,
};

// Thunk for user sign-up
export const custSignup = createAsyncThunk(
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

// Thunk for user otp verify
export const custVerify = createAsyncThunk(
  "userVerify",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthSublyApi.verifyOtp(data);
      return { response: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for user Login
export const custLogin = createAsyncThunk(
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

// Thunk for user Login and signup with google
export const custGoogleAuth = createAsyncThunk(
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
    deleteUserDetails: (state) => {
      state.userDetails = {};
    },
  },
  extraReducers: (builder) => {
    // ------Builder for Signup-------
    builder.addCase(custSignup.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(custSignup.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(custSignup.rejected, (state, action) => {
      state.isLoading = false;
    });

    // =========================================================

    builder.addCase(custVerify.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(custVerify.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(custVerify.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ==================================================

    builder.addCase(custLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(custLogin.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(custLogin.rejected, (state, action) => {
      state.isLoading = false;
    });

    // =========================================================

    builder.addCase(custGoogleAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(custGoogleAuth.fulfilled, (state, action) => {
      const response = action.payload.response;
      state.isLoading = false;
      if (response?.statusCode === 200) {
        state.userDetails = response.data;
        state.success = true;
      } else {
        state.success = false;
      }
    });

    builder.addCase(custGoogleAuth.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { deleteUserDetails } = userMediaSlice.actions;
export default userMediaSlice.reducer;
