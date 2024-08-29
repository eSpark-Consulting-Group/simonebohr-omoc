import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { thunk } from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import userMediaSlice from "./Slices/AuthSlice";
import dashboardSlice from "./Slices/DashboardSlice";

const rootReducer = combineReducers({
  userData: userMediaSlice,
  dashboard: dashboardSlice,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  applyMiddleware(thunk)
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
