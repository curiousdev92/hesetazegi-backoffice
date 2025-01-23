import { recipesPageLimit } from "@src/utils/constants";
import { GET_RECIPE_LIST } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

export const getRecipes = async (searchParams: URLSearchParams) => {
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort");
  const status = searchParams.get("tab") || 200;
  !searchParams.get("page") && searchParams.set("page", "1");
  searchParams.set("limit", String(recipesPageLimit));
  searchParams.set("status", String(status));
  !sort && searchParams.set("sort", "srt-newest");
  const queryString = decodeURI(searchParams.toString());

  // Set a fixed cache key for pages
  const recipeCacheKeyBase = `recipes/${page}`;

  const recipeCacheKey = `${recipeCacheKeyBase}?${queryString}`;

  if (cache.has(recipeCacheKey)) {
    return cache.get(recipeCacheKey);
  }

  const data: RecipesDataType = await GET(
    `${GET_RECIPE_LIST}/${"fa"}${queryString ? "?" : ""}${queryString}`
  );
  cache.set(recipeCacheKey, data);
  return data;
};
