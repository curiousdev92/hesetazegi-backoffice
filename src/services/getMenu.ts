import { GET_MENU_URL } from "@src/utils/urls";
import { GET } from ".";

export const getMenu = async () => {
  const menu = (await GET(`${GET_MENU_URL}/fa`)) as MenuEntity[];
  return [
    ...menu,
    {
      key: "weblogs",
      title: "مجله",
      icon: "",
      parentKey: null,
      route: "/weblogs",
      priority: 998,
      items: null,
    },
  ];
};
