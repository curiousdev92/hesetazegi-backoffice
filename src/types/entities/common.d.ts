type MenuEntity = {
  icon: string;
  items?: MenuEntity;
  key: string;
  parentKey?: string;
  priority: number;
  route: string;
  title: string;
}[];

type ActionsType = "act-modify" | "act-create" | "act-delete" | "act-read";

interface PermissionItemType {
  key: string;
  title: string;
  actions: ActionsType[];
}
