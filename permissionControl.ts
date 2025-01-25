type Permission = {
  key: string;
  actions: string[];
};

type PermissionsMap = Record<string, Set<string>>;

const normalizePermissions = (permissions: Permission[]): PermissionsMap => {
  return permissions.reduce((acc, { key, actions }) => {
    acc[key] = new Set(actions); // Using Set for faster lookup
    return acc;
  }, {} as PermissionsMap);
};

const hasPermission = (
  permissionsMap: PermissionsMap,
  key: string,
  action: string
): boolean => {
  return permissionsMap[key]?.has(action) ?? false; // Return false if the key doesn't exist
};

import React from "react";

type UserPermissions = Permission[];

interface MyComponentProps {
  userPermissions: UserPermissions;
}

const MyComponent: React.FC<MyComponentProps> = ({ userPermissions }) => {
  const permissionsMap = normalizePermissions(userPermissions); // Normalize permissions once

  const canRead = hasPermission(
    permissionsMap,
    "md-bo-question-answer-nutrition-question",
    "act-read"
  );
  const canCreate = hasPermission(
    permissionsMap,
    "md-bo-question-answer-nutrition-question",
    "act-create"
  );
  const canModify = hasPermission(
    permissionsMap,
    "md-bo-question-answer-nutrition-question",
    "act-modify"
  );
  const canDelete = hasPermission(
    permissionsMap,
    "md-bo-question-answer-nutrition-question",
    "act-delete"
  );

  return (
    <div>
      {canRead && <button>Read Question</button>}
      {canCreate && <button>Create Question</button>}
      {canModify && <button>Modify Question</button>}
      {canDelete && <button>Delete Question</button>}
      {!canRead && <p>You do not have permission to view this content.</p>}
    </div>
  );
};

export default MyComponent;

// Example of fetching and normalizing permissions after login
const fetchPermissions = async (): Promise<UserPermissions> => {
  const response = await fetch("/api/GetPermissions");
  const data = await response.json();
  return data.data;
};

// Example of using it in the app
const App = () => {
  const [permissions, setPermissions] = React.useState<UserPermissions>([]);

  React.useEffect(() => {
    const loadPermissions = async () => {
      const userPermissions = await fetchPermissions();
      setPermissions(userPermissions);
    };
    loadPermissions();
  }, []);

  return (
    <div>
      {permissions.length > 0 ? (
        <MyComponent userPermissions={permissions} />
      ) : (
        <p>Loading permissions...</p>
      )}
    </div>
  );
};
