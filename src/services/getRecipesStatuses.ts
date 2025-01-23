import { formatNumber } from "@src/utils/helpers";
import { GET_RECIPE_STATUSES } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

function mapStatuses(cat: recipeStatuseType) {
  return {
    ...cat,
    count: formatNumber(cat.count, "fa"),
    key: String(cat.code),
  };
}

export const getRecipesStatuses = async () => {
  const cashKey = "recipes/statuses";

  if (cache.has(cashKey)) {
    return cache.get(cashKey);
  } else {
    const statuses: recipeStatusesType = await GET(`${GET_RECIPE_STATUSES}`);
    const mappedStatuses = statuses.map(mapStatuses);
    cache.set(cashKey, mappedStatuses);
    return mappedStatuses;
  }
};
