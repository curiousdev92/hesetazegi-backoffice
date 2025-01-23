import { create } from "zustand";
import createMenuSlice from "./menuSlice";
import createPaginationSlice from "./paginationSlice";

export const useStore = create<MenuSlice & PaginationSlice>()((...a) => ({
  ...createMenuSlice(...a),
  ...createPaginationSlice(...a),
}));
