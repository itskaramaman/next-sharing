import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./features/appSlice";

const store = configureStore({
  reducer: appSliceReducer,
});

export default store;
