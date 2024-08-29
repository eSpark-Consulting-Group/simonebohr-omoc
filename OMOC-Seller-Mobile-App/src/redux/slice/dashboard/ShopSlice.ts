import { createSlice } from "@reduxjs/toolkit";

const ShopSlice = createSlice({
  name: "ShopName",
  initialState: {
    currentShop: {},
  },
  reducers: {
    changeShop: (state, action) => {
      state.currentShop = action.payload;
    },
  },
});

export const { changeShop } = ShopSlice.actions;
export default ShopSlice.reducer;
