// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),

    userAccount: builder.query({
      query: (token) => ({
        url: "/auth/me",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

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
      query: ({userId, token}) => ({
        url: `/carts/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: ({ productId, token }) => ({
        url: `/carts/guest`,
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
      query: ({ productId, token }) => ({
        url: `/carts/${productId}`,
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

    addToUserCart: builder.mutation({
      query: ({ userId, token, cart }) => ({
        url: `/carts/${userId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: { cart },
      }),
    }),

    deleteUserCartItem: builder.mutation({
      query: ({ userId, productId, token }) => ({
        url: `/carts/${userId}`,
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

    updateUserCart: builder.mutation({
      query: ({ userId, productId, token }) => ({
        url: `/carts/${productId}`,
        method: "PUT",
        body: {
          userId,
          products: [{productId, quantity: 1}]
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    userOrders: builder.query({
      query: (token) => ({
        url: "/orders/user",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createOrder: builder.mutation({
      query: (token) => ({
        url: "/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    productList: builder.query({
      query: () => ({
        url: "/products",
      }),
    }),

    singleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ productId, product, token }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: product,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    userList: builder.query({
      query: (token) => ({
        url: "/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

  

    updateUser: builder.mutation({
      query: ({ userId, body, token }) => ({
        url: `/users/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body,
      }),
    }),

    allCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserAccountQuery,
  useCartListQuery,
  useUserCartQuery,
  useAddToCartMutation,
  useDeleteCartItemMutation,
  useAddToUserCartMutation,
  useDeleteUserCartItemMutation,
  useUserOrdersQuery,
  useCreateOrderMutation,
  useProductListQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
  useUserListQuery,
  useSingleUserQuery,
  useUpdateUserCartMutation,
  useUpdateUserMutation,
  useAllCategoriesQuery,
} = apiSlice;

//useEndpointnameMutation
//useEndpointnameQuery
