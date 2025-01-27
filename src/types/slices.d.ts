type MenuSlice = {
  menu: MenuEntity;
  setMenu: (newMenu: MenuEntity) => void;
};

type PaginationSlice = {
  total: number;
  setTotal: (newTotal: number) => void;
};

type PermissionSlice = {
  permissions: PermissionsMap;
  setPermissions: (newMenu: PermissionsMap) => void;
};

type AdminSlice = {
  adminStatus: adminStatusEntity | null;
  setAdminStatus: (newstatus: AdminSlice["adminStatus"]) => void;
};
