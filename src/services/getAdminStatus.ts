import { GET_ADMIN_STATUS } from "@src/utils/urls";
import { GET } from ".";

export const getAdminStatus = async () => {
  const status = (await GET(`${GET_ADMIN_STATUS}`)) as adminStatusEntity;
  return status;
};
