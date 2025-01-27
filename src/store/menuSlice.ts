import { StateCreator } from "zustand";

const createMenuSlice: StateCreator<MenuSlice> = (set) => ({
  menu: [],
  setMenu: (newMenu) => set(() => ({ menu: newMenu })),
});

export default createMenuSlice;
