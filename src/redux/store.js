import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import { apiSlice } from "./api";


// import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cartSlice: cartSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
});


