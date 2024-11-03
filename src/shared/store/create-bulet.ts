import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBulet, IBuletMain } from "../types";

const initialState: IBuletMain = {
  id: 0,
  isSelected: "",
  isEmptyBulets: false,
  bulets: [],
  content_blocks: [],
};

export type IsSelectedBulet = "bulet" | "heading";
type isNewSubtitle = "new-subtitle" | "new-bulet";

export const buletSlice = createSlice({
  name: "bulet",
  initialState,
  reducers: {
    createBulet: (
      state,
      actions: PayloadAction<{ type: isNewSubtitle; index: number }>
    ) => {
      const { type, index } = actions.payload;
      const indexBulet = type === "new-subtitle" ? state.id : index + 1;

      const newBulet = {
        id: state.bulets.length + 1,
        title: "",
        isHeadingBulet: false,
      };
      state.bulets.splice(indexBulet, 0, newBulet);
      state.isEmptyBulets = false;
    },
    changeValueBulet: (
      state,
      actions: PayloadAction<{ id: number; value: string }>
    ) => {
      const { id, value } = actions.payload;
      const bulet = state.bulets.find((item) => item.id === id)!;
      bulet.title = value;
    },

    changeValueSelect: (state, actions: PayloadAction<string>) => {
      const currentBulet = state.bulets.find((item) => item.id === state.id);

      if (actions.payload === "heading" && currentBulet) {
        currentBulet.isHeadingBulet = true;
        state.isSelected = actions.payload;
      } else if (actions.payload === "bulet" && currentBulet) {
        currentBulet.isHeadingBulet = false;
        state.isSelected = actions.payload;
      }
    },

    groupBulets: (state) => {
      function groupByHeadings(array: IBulet[]) {
        const result = [];
        let currentGroup = null;

        for (const item of array) {
          if (item.isHeadingBulet) {
            if (currentGroup) {
              result.push(currentGroup);
            }
            currentGroup = {
              id: item.id,
              heading: item.title,
              bulets: [] as IBulet[],
            };
          } else if (currentGroup) {
            if (currentGroup.bulets.length === 0) {
              state.isEmptyBulets = true;
            }
            currentGroup.bulets.push(item);
          }
        }
        if (currentGroup) {
          if (currentGroup.bulets.length === 0) {
            state.isEmptyBulets = true;
          }
          result.push(currentGroup);
        }

        return result;
      }

      const result = groupByHeadings(state.bulets);
      state.content_blocks = result;
    },

    deleteGroupBulets: (state) => {
      const filterBlockBulets = state.content_blocks.filter(
        (bulet) => bulet.id !== state.id
      );
      state.content_blocks = filterBlockBulets;
    },

    focusOnBulet: (
      state,
      actions: PayloadAction<{ type: IsSelectedBulet; id: number }>
    ) => {
      const { type, id } = actions.payload;
      state.id = id;
      state.isSelected = type;
    },
  },
});

export const {
  createBulet,
  changeValueBulet,
  changeValueSelect,
  focusOnBulet,
  groupBulets,
  deleteGroupBulets,
} = buletSlice.actions;

export default buletSlice.reducer;
