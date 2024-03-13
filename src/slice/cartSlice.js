import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/api";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: [] },

  reducers: {
    // setCart is to for logged in user's cart from db
    //to be set to redux store
    //payload is cart info from db (api)
    setCart: (state, { payload }) => {
      state.cart = payload;
      return state;
    },

    addToCart: (state, { payload }) => {
      state.cart.push(action.payload);
      state.cart = payload;
      return state;
    },

    setProductToLocalStorage: (state, { payload }) => {
      const cartProduct = JSON.parse(localStorage.setItem("product", payload));
      const localStorageCart = localStorage.getItem("cart");
      state.cart = localStorageCart;
    },

    deleteCart: (state, { payload }) => {
      state.cart = payload;
    },

    createOrder: (state) => {
      state.cart = [];
      return state;
    },
   
    clearCart: (state) => {
      state.cart = [];
      return state;
    },


  },
});

export const { getCart, addToCart, deleteFromCart, createOrder, setProductToLocalStorage, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
