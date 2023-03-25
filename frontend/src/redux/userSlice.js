import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ email, password }) => {
    // eslint-disable-next-line no-undef
    const res = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth`, {
      email: email,
      password: password,
    });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("jwtToken")
      ? jwtDecode(localStorage.getItem("jwtToken"))
      : null,
    isLoggedIn: localStorage.getItem("jwtToken") ? true : false,
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
      localStorage.setItem("jwtToken", action.payload.accessToken);
      state.userInfo = localStorage.getItem("jwtToken")
        ? jwtDecode(localStorage.getItem("jwtToken"))
        : null;
      state.isLoggedIn = true;
      console.log("fetched user data");
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      console.log("failed to fetch user data");
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;
