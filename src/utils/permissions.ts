import { useStore } from "@src/store";

type Permission = { key: string; actions: string[] };
type NormalizeType = (permissions: Permission[]) => PermissionsMap;
type HasPermFunc = (
  key: string,
  act: "modify" | "create" | "delete" | "read"
) => boolean;

export const normalizePermissions: NormalizeType = (permissions) => {
  return permissions.reduce((acc, { key, actions }) => {
    acc[key] = new Set(actions); // Using Set for faster lookup
    return acc;
  }, {} as PermissionsMap);
};

const permissions = useStore.getState().permissions;

export const hasPermission: HasPermFunc = (key, action) => {
  return permissions[key]?.has(`act-${action}`) ?? false; // Return false if the key doesn't exist
};
