import { GET_ADMIN_LIST } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

export const getAdminList = async () => {
  const cashKey = "admins/list";

  if (cache.has(cashKey)) {
    return cache.get(cashKey);
  } else {
    const admins = (await GET(`${GET_ADMIN_LIST}/fa`)) as adminsEntityType;
    cache.set(cashKey, admins);
    return admins;
  }
};
