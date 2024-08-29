import { createSlice } from "@reduxjs/toolkit";

const CartSlice: any = createSlice({
  name: "cart",
  initialState:[],
  reducers: {
    ADD_WISHLIST: (state, action) => {
      state.push(action.payload)
    },
  },
});

const { actions, reducer } = CartSlice;
export const { ADD_WISHLIST } = actions;
export default reducer;
