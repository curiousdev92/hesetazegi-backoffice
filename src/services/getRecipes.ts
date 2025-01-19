import { recipesPageLimit } from "@src/utils/constants";
import { GET_RECIPE_STATUSES_URL, GET_RECIPES_URL } from "@src/utils/urls";
import { LoaderFunctionArgs } from "react-router";
import { GET } from ".";

const cache = new Map();

export const getRecipes = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;

  // Set a fixed cache key for pages
  const recipeCacheKeyBase = `recipes/${page}`;
  const statusesCacheKey = `statuses/recipe`;

  // Build a query string excluding "page" to handle parameter-specific caching
  searchParams.set("limit", String(recipesPageLimit));
  const queryString = decodeURI(searchParams.toString());
  const recipeCacheKey = `${recipeCacheKeyBase}?${queryString}`;

  // Initialize result structure
  const result: { data: RecipesDataType; statuses: recipeStatusesType } = {
    data: { records: [], total: 0 },
    statuses: [],
  };

  // Check recipe cache specific to the query parameters (page and others)
  if (cache.has(recipeCacheKey)) {
    result.data = cache.get(recipeCacheKey);
  } else {
    const data: RecipesDataType = await GET(
      `${GET_RECIPES_URL}/${"fa"}${queryString ? "?" : ""}${queryString}`
    );
    result.data = data;
    cache.set(recipeCacheKey, data);
  }

  // Check statuses cache (unchanged by query params)
  if (cache.has(statusesCacheKey)) {
    result.statuses = cache.get(statusesCacheKey);
  } else {
    const statuses: recipeStatusesType = await GET(GET_RECIPE_STATUSES_URL);
    result.statuses = statuses;
    cache.set(statusesCacheKey, statuses);
  }

  return result;
};
