import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./exampleSlice";

export const store = configureStore({
  reducer: {
    example: exampleSlice,
  },
});
