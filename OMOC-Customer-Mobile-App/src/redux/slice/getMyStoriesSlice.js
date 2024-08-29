import { createSlice } from "@reduxjs/toolkit";

const getMyStoriesSlice = createSlice({
  name: "profile",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    myStoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    myStoriesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    myStoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { myStoriesRequest, myStoriesSuccess, myStoriesFailure } =
  getMyStoriesSlice.actions;
export default getMyStoriesSlice.reducer;
