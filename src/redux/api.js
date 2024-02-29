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
        url: "/auth/register",
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
      query: ({ id, token }) => ({
        url: `/carts/user/${id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: ({ productId, token }) => ({
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
      query: ({ productId, token }) => ({
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

    addToUserCart: builder.mutation({
      query: ({ id, token, cart }) => ({
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
      query: ({ id, productId, token }) => ({
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
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, product, token }) => ({
        url: `/products/${id}`,
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

    singleUser: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/users/${id}`,
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
  useUpdateUserMutation,
  useAllCategoriesQuery,
} = apiSlice;

//useEndpointnameMutation
//useEndpointnameQuery
