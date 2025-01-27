import { StateCreator } from "zustand";

const createPermissionSlice: StateCreator<PermissionSlice> = (set) => ({
  permissions: {},
  setPermissions: (perms) => set(() => ({ permissions: perms })),
});

export default createPermissionSlice;
