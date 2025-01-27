import { create } from "zustand";
import createAdminSlice from "./adminSlice";
import createMenuSlice from "./menuSlice";
import createPaginationSlice from "./paginationSlice";
import createPermissionSlice from "./permissionSlice";

type SlicesType = MenuSlice & PaginationSlice & PermissionSlice & AdminSlice;

export const useStore = create<SlicesType>()((...a) => ({
  ...createMenuSlice(...a),
  ...createPaginationSlice(...a),
  ...createPermissionSlice(...a),
  ...createAdminSlice(...a),
}));
