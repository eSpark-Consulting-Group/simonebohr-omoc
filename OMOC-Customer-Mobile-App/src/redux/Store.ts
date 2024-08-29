import { configureStore } from "@reduxjs/toolkit";
import OrdersSlice from "./slice/dashboard/OrdersSlice";
import AddressSlice from "./slice/dashboard/AddressSlice";
import CartSlice from "./slice/dashboard/CartSlice";
import getProfileSlice from "./slice/getProfileSlice";
import getMyStoriesSlice from "./slice/getMyStoriesSlice";
import getVideosSlice from "./slice/getVideosSlice";

export const Store = configureStore({
  reducer: {
    OrdersSlice,
    AddressSlice,
    CartSlice,
    profile: getProfileSlice,
    myStory: getMyStoriesSlice,
    getVideosSlice,
  },
});
