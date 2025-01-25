type Permission = { key: string; actions: string[] };
type PermissionsMap = Record<string, Set<string>>;
type NormalizeType = (permissions: Permission[]) => PermissionsMap;
type HasPermFunc = (p: PermissionsMap, k: string, a: string) => boolean;

export const normalizePermissions: NormalizeType = (permissions) => {
  return permissions.reduce((acc, { key, actions }) => {
    acc[key] = new Set(actions); // Using Set for faster lookup
    return acc;
  }, {} as PermissionsMap);
};

export const hasPermission: HasPermFunc = (permissionsMap, key, action) => {
  return permissionsMap[key]?.has(action) ?? false; // Return false if the key doesn't exist
};
