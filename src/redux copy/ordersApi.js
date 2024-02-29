import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com",
    }),
    
    endpoints: (builder ) => ({ 

        userOrders: builder.query({
            query: (token ) => ({
                url: "/orders/user",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        }),

        createOrder: builder.mutation({
            query: (token ) => ({
                url: "/orders",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })
});

export const {
    useUserOrdersQuery,
    useCreateOrderMutation
} = ordersApi

