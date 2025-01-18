import { recipesPageLimit } from "@src/utils/constants";
import { GET_RECIPES_URL } from "@src/utils/urls";
import { LoaderFunctionArgs } from "react-router";
import { GET } from ".";

const cache = new Map();

export const getRecipes = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const cacheKey = `recipes/${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  searchParams.set("limit", String(recipesPageLimit));

  const queryString = decodeURI(searchParams.toString());
  const recipes = await GET(
    `${GET_RECIPES_URL}/${"fa"}${queryString ? "?" : ""}${queryString}`
  );
  cache.set(cacheKey, recipes);

  return recipes;
};
