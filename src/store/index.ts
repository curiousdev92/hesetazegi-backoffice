import { create } from "zustand";
import createBearSlice from "./bearSlice";

interface BearSlice {
  bears: number;
  addBear: () => void;
}

export const useStore = create<BearSlice>()((...a) => ({
  ...createBearSlice(...a),
}));
