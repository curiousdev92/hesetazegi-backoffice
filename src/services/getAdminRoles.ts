import { GET_ADMIN_ROLES } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

export const getAdminRoles = async () => {
  const cashKey = "admins/roles";

  if (cache.has(cashKey)) {
    return cache.get(cashKey);
  } else {
    const roles = await GET(`${GET_ADMIN_ROLES}`);
    cache.set(cashKey, roles);
    return roles;
  }
};
