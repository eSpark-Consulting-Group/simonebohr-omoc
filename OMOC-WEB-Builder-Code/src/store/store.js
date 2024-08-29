
// import counterSlice from '../reducers/CommanStateReducer'  
import subheader from '../store/reducers/SubheaderReducer'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import {
  combineReducers,
  applyMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";



const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  subheader: subheader,
});

const persistedReducer = persistReducer(
  persistConfig,
  reducer,
  applyMiddleware(thunk)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})