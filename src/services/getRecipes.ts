import { recipesPageLimit } from "@src/utils/constants";
import { GET_RECIPES_URL } from "@src/utils/urls";
import { LoaderFunctionArgs } from "react-router";
import { GET } from ".";

export const getRecipes = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  searchParams.set("limit", String(recipesPageLimit));

  const queryString = decodeURI(searchParams.toString());

  return GET(
    `${GET_RECIPES_URL}/${"fa"}${queryString ? "?" : ""}${queryString}`
  );
};
