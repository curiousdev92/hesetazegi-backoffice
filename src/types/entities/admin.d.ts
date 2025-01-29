type adminStatusEntity = {
  adminId: string;
  firstname: string;
  lastname: string;
  fullName: string;
  position: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
};

type adminItemType = {
  adminId: string;
  firstname: string;
  lastname: string;
  fullName: string;
  adminName: string;
  avatar: string;
  isActive: boolean;
  roles: { key: number; value: string }[];
  creationDate: string;
  position: string;
};

type adminsEntityType = {
  count: number;
  pageIndex: number;
  pageSize: number;
  result: adminItemType[];
  totalPage: number;
};
