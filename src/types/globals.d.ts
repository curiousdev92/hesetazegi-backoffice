type TabItem = {
  label: string;
  key: string;
  icon?: string;
  count?: number | string;
};

type LocalesType = "fa" | "en" | "ar";

type ItemType = { label: string; key: string };

type PermissionsMap = Record<string, Set<string>>;
