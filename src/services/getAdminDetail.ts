import { GET_ADMIN_DETAIL } from "@src/utils/urls";
import { GET } from ".";

export const getAdminDetail = async (id: string) => {
  return await GET(`${GET_ADMIN_DETAIL}/${id}`);
};
