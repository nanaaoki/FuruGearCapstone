import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  endpoints: (builder) => ({
    //
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
      query: (id, product, token) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useProductListQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
} = productsApi;
