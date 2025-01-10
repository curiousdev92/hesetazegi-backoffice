type MenuEntity = {
  icon: string;
  items?: MenuEntity;
  key: string;
  parentKey?: string;
  priority: number;
  route: string;
  title: string;
}[];
