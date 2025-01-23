type WeblogCategoryItem = {
  weblogCategoryId: number;
  weblogCategoryParentId?: null;
  key: string;
  title: string;
  isActive: boolean;
  icon: { src: string; alt: string };
  blogCount?: number;
  categories: Omit<WeblogCategoryItem, "categories">[];
};
