import { GET_ADMIN_LIST } from "@src/utils/urls";
import { GET } from ".";

export const getAdminList = async () => {
  const admins = (await GET(`${GET_ADMIN_LIST}/fa`)) as adminsEntityType;
  return admins;
};
