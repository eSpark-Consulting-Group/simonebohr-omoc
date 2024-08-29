import { createSlice } from "@reduxjs/toolkit";

const getVideosSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    videoRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    videoSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    videoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { videoRequest, videoSuccess, videoFailure } =
  getVideosSlice.actions;
export default getVideosSlice.reducer;
