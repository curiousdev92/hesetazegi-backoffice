import { GET_ADMIN_LIST } from "@src/utils/urls";
import { GET } from ".";

export const getAdminList = async () => {
  return (await GET(`${GET_ADMIN_LIST}/fa`)) as adminsEntityType;
};
