import { GET_PERMISSIONS } from "@src/utils/urls";
import { GET } from ".";

export const getPermissions = async () => {
  return (await GET(`${GET_PERMISSIONS}/fa`)) as PermissionItemType[];
};
