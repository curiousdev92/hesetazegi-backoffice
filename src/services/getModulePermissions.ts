import { GET_MODULE_PERMISSIONS } from "@src/utils/urls";
import { POST } from ".";

const cache = new Map();

export const getModulePermissions = async () => {
  const cashKey = "roles/roles";

  if (cache.has(cashKey)) {
    return cache.get(cashKey);
  } else {
    const roles = await POST(`${GET_MODULE_PERMISSIONS}/fa/0`, undefined);
    cache.set(cashKey, roles);
    return roles;
  }
};
