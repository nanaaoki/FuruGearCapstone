import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/api";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: [] },

  reducers: {

    addToCart: (state, action) => {
      //action is type = "cartSlice/addToCart" and payload = product
      console.log("state.cart", state.cart)
      state.cart.push(action.payload);
      return state;
    },

    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product.id !== payload);
      return state;
    },

    clearCart: (state) => {
      state.cart = [];
      return state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;


//state is the api & cartSlice.
export const getCart = (state) => {
  return state.cartSlice.cart;
};
