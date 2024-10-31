import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Bulet {
  id: number;
  title: string;
  isHeadingBulet: boolean;
}

interface BuletElements {
  id: number;
  heading: string;
  isHeading: boolean;
  bullets: Bulet[];
}

interface BuletSlice {
  id: number;
  title: string;
  content_blocks: BuletElements[];
}

let idBoolet = 1;
let idBlock = 1
const initialState: BuletSlice[] = [
  {
    id: 1,
    title: "",
    content_blocks: [
      {
        id: 1,
        heading: "",
        isHeading: false,
        bullets: [],
      },
    ],
  },
];
export const slideSlice = createSlice({
  name: "buletSlice",
  initialState,
  reducers: {
    addBulet: (state) => {
      const findSlide = state.find((item) => item.id === 1);
      if (!findSlide) return;
      const currentBulet = findSlide.content_blocks.find(
        (item) => item.id === 1
      );
      if (!currentBulet) return;

      currentBulet.bullets.push({ id: idBoolet++, title: "", isHeadingBulet: false });
    },
    setValueBulet: (
      state,
      actions: PayloadAction<{ id: number; value: string }>
    ) => {
      const findSlide = state.find((item) => item.id === 1);
      if (!findSlide) return;
      const currentBulet = findSlide.content_blocks.find(
        (item) => item.id === 1
      );
      if (!currentBulet) return;
      const bulet = currentBulet.bullets.find(
        (item) => item.id === actions.payload.id
      );
      if (!bulet) return;

      bulet.title = actions.payload.value;
    },

    changeHeading: (state, actions: PayloadAction<number>) => {
      const findSlide = state.find((item) => item.id === 1);
      if (findSlide) {
        const currentBlock = findSlide.content_blocks.find(
          (item) => item.id === 1
        );
        if (!currentBlock) return;
        const bulet = currentBlock.bullets.find(
            (item) => item.id === actions.payload
          );
        if(!bulet) return;

        const deletedBulets = currentBlock.bullets.slice(actions.payload - 1)
        console.log('deletedBulets: ', deletedBulets);
        const newBlock = {
            id: idBlock++,
            heading: bulet.title,
            isHeading: true,
            bullets: deletedBulets,
          }
        findSlide.content_blocks.push(newBlock)
        bulet.isHeadingBulet = true
        currentBlock.bullets = currentBlock.bullets.slice(0, actions.payload - 1)
        currentBlock.heading = bulet.title;
        currentBlock.isHeading = !currentBlock.isHeading;
      }
    },
  },
});

export const { addBulet, setValueBulet, changeHeading } = slideSlice.actions;

export default slideSlice.reducer;
