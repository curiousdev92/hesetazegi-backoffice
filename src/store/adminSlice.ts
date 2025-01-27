import { StateCreator } from "zustand";

const createAdminSlice: StateCreator<AdminSlice> = (set) => ({
  adminStatus: null,
  setAdminStatus: (newStatus) => set(() => ({ adminStatus: newStatus })),
});

export default createAdminSlice;
