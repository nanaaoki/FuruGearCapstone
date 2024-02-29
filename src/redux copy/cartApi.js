import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  endpoints: (builder) => ({

    cartList: builder.query({
      query: (token) => ({
        url: "/carts",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    userCart: builder.query({
      query: (id, token) => ({
        url: `/carts/${id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: (productId, token) => ({
        url: `/carts/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: {
          productId,
        },
      }),
    }),

    deleteCartItem: builder.mutation({
      query: (productId, token) => ({
        url: "/carts",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: {
          productId: productId,
        },
      }),
    }),

    userAddToCart: builder.mutation({
      query: (id, token, cart) => ({
        url: `/carts/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: { cart },
      }),
    }),

    deleteUserCartItem: builder.mutation({
        query: (id, productId, token) => ({
          url: `/carts/${id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: {
            productId: productId,
          },
        }),
      }),
  }),
});

export const {
  useCartListQuery,
  useUserCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useUserAddToCartMutation,
  useDeleteUserCartItemMutation
} = cartApi
