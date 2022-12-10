import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  name: "example",
  initialState: {},
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default exampleSlice.reducer;
