import { create } from "zustand";
import createMenuSlice from "./menuSlice";
import createPaginationSlice from "./paginationSlice";
import createPermissionSlice from "./permissionSlice";

export const useStore = create<MenuSlice & PaginationSlice & PermissionSlice>()(
  (...a) => ({
    ...createMenuSlice(...a),
    ...createPaginationSlice(...a),
    ...createPermissionSlice(...a),
  })
);
