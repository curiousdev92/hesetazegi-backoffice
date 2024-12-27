import { StateCreator } from "zustand";

interface BearSlice {
  bears: number;
  addBear: () => void;
}
const createBearSlice: StateCreator<BearSlice, [], [], BearSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

export default createBearSlice;
