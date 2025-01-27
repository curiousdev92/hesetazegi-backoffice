import { getAdminStatus } from "./getAdminStatus";
import { getMenu } from "./getMenu";
import { getPermissions } from "./getPermissions";

export const getInitData = async () => {
  return {
    menu: await getMenu(),
    permissions: await getPermissions(),
    status: await getAdminStatus(),
  };
};
