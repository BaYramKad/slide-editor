import { configureStore } from "@reduxjs/toolkit";
import { slideSlice } from "./create-slide";
import { buletSlice } from "./create-bulet";

export const store = configureStore({
  reducer: {
    slide: slideSlice.reducer,
    bulet: buletSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
