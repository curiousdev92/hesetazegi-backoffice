type MenuSlice = {
  menu: MenuEntity;
  setMenu: (newMenu: MenuEntity) => void;
};

type PaginationSlice = {
  total: number;
  setTotal: (newTotal: number) => void;
};
