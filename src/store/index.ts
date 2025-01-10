import { create } from "zustand";
import createMenuSlice from "./menuSlice";

export const useStore = create<MenuSlice>()((...a) => ({
  ...createMenuSlice(...a),
}));
