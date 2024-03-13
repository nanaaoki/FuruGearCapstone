import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api";


// import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
});


