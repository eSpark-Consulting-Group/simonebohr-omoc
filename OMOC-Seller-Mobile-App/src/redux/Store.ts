import { configureStore } from "@reduxjs/toolkit";
import OrdersSlice from "./slice/dashboard/OrdersSlice";
import ShopSlice from "./slice/dashboard/ShopSlice";

export const Store = configureStore({
  reducer: {
    OrdersSlice,
    ShopSlice
  },
});
