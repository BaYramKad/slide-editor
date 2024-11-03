import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISlide } from "../types";

const initialState: ISlide[] = [
  {
    id: 1,
    title: "",
    content_blocks: [],
  },
];
export const slideSlice = createSlice({
  name: "slide",
  initialState,
  reducers: {
    createSlide: (state) => {
      const newSlide: ISlide = {
        id: state.length + 1,
        title: "",
        content_blocks: [],
      };
      state.push(newSlide);
    },

    changeTitleSlide: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const currentSlide = state.find((item) => item.id === action.payload.id)!;
      currentSlide.title = action.payload.title;
    },
  },
});

export const { createSlide, changeTitleSlide } = slideSlice.actions;

export default slideSlice.reducer;
