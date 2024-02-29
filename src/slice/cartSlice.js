import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../redux/cartApi";
import { ordersApi } from "../redux/ordersApi";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: { cart: []},

    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => { 
            state.cart.push(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            cartApi.endpoints.cartList.matchFulfilled,
            (state, { payload }) => {
                state.cart = payload;
                return state;
            }
        );

        builder.addMatcher(
            cartApi.endpoints.userCart
        )
    }
})