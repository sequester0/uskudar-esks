import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ email, password }) => {
    console.log(`fetching user data with email: ${email} and password: ${password}`);
    const res = await axios("post", `${process.env.REACT_APP_BASE_ENDPOINT}/auth`, {
      email,
      password,
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "example",
    surname: "example",
    email: "example",
    permissionLevel: 0,
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
    status: "idle",
    error: null,
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      console.log("fetching user data");
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
