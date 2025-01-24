import { GET_WEBLOG_CATEGORIES } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

export const getWeblogsRequirements = async () => {
  const cashKey = "weblogs/categories";

  if (cache.has(cashKey)) {
    return cache.get(cashKey);
  } else {
    const categories: WeblogCategoryItem[] = await GET(
      `${GET_WEBLOG_CATEGORIES}/fa`
    );
    const filteredCategories = categories.filter((cat) => cat.isActive);
    cache.set(cashKey, filteredCategories);
    return filteredCategories;
  }
};
