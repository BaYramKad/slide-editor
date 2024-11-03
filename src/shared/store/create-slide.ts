import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISlide } from "../types";

const initialState: ISlide = {
  id: 1,
  title: "",
};
export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    changeTitleSlide: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.title = action.payload.title;
    },
  },
});

export const { changeTitleSlide } = slideSlice.actions;

export default slideSlice.reducer;
