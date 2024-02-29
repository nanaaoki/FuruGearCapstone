import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../redux/api";
import { usersApi } from "../redux/usersApi";

//Creating a piece/slice of the redux store and naming it "authSlice"
const authSlice = createSlice({
  name: "authSlice",
  initialState: { users: null, token: null },

  //reducers property is defining a function called setToken.
  //Reducers will update the state based on dispatched actions
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      //matches incoming action against own filter
      //Handle the fulfilled action of the endpoint defined in registerUser (/auth/register) from authApi.js
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        //update the state w/ user info and token from payload
        state.users = payload.user;
        state.token = payload.token;
        console.log("payload", payload);
      }
    );
    builder.addMatcher(
      //Handle the fulfilled action of the loginUser endpont from authApi
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        //update the state w/ user info and token from payload
        state.users = payload.user;
        state.token = payload.token;
        console.log("stateuser", state.users);
        console.log("statetoken", state.token);
      }
    );
    builder.addMatcher(
      //Handle the fulfilled action of the userAccount endpont from authApi
      authApi.endpoints.userAccount.matchFulfilled,
      (state, { payload }) => {
        console.log("payload", payload);
        return { ...state, users: payload };
      }
    );
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
