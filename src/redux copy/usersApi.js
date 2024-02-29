import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reduerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  endpoints: (builder) => ({
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
      query: (id, token) => ({
        url: `/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateUser: builder.mutation({
      query:
        (id,
        email,
        username,
        firstname,
        lastname,
        phone,
        password,
        city,
        street,
        number,
        zipcode,
        token),
      url: `/users/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: {
        email,
        username,
        firstname,
        lastname,
        phone,
        password,
        city,
        street,
        number,
        zipcode,
      },
    }),
  }),
});

export const { 
    useUserListQuery, 
    useSingleUserQuery, 
    useUpdateUserMuation 
} =
  usersApi;
