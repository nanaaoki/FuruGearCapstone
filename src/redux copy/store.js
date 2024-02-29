import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./authApi";
import { cartApi } from "./cartApi";
import { ordersApi } from "./ordersApi";
import { productsApi } from "./cartApi";
import { usersApi } from "./usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
  reducer: {
   authSlice, cartSlice, orderSlice, productsSlice, usersSlice, 
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, cartApi.middleware, ordersApi.middleware, productsApi.middleware, usersApi.middleware),
});


setupListeners(store.dispatch);