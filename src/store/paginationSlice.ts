import { StateCreator } from "zustand";

const createPaginationSlice: StateCreator<PaginationSlice> = (set) => ({
  total: 15,
  setTotal: (newTotal: number) => set(() => ({ total: newTotal })),
});

export default createPaginationSlice;
