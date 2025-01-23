import { GET_WEBLOG_CATEGORIES } from "@src/utils/urls";
import { GET } from ".";

export const getWeblogsRequirements = async () => {
  const categories: WeblogCategoryItem[] = await GET(
    `${GET_WEBLOG_CATEGORIES}/fa`
  );

  return categories.filter((cat) => cat.isActive);
};
