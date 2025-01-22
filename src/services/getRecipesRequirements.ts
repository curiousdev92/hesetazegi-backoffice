import { formatNumber } from "@src/utils/helpers";
import { GET_RECIPE_STATUSES } from "@src/utils/urls";
import { GET } from ".";

export const getRecipesRequirements = async () => {
  const categories: recipeStatusesType = await GET(`${GET_RECIPE_STATUSES}`);

  return categories.map((cat) => ({
    ...cat,
    count: formatNumber(cat.count, "fa"),
    key: String(cat.code),
  }));
};
