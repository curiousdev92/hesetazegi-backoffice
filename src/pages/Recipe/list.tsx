import EmptyStateImage from "@src/assets/images/empty-state.png";
import EmptyState from "@src/components/EmptyState";

import Spinner from "@src/components/Spinner";
import ItemRow from "@src/layouts/ItemRow";
import { useStore } from "@src/store";
import { FC } from "react";
import { useLoaderData, useNavigation } from "react-router";

type PropTypes = {};
type RecipesDataType = { total: number; records: FoodRecipeItem[] };

const RecipeListPage: FC<PropTypes> = () => {
  const navigation = useNavigation();
  const setTotal = useStore((st) => st.setTotal);
  const data = useLoaderData() as RecipesDataType;
  const recipes = data.records.map((r) => ({
    date: r.creationDate * 1000,
    title: r.recipeTitle,
    key: r.foodRecipeKey,
    image: r.image,
    isCompeleteContent: r.isCompeleteContent,
    isCompeleteMedia: r.isCompeleteMedia,
    isCompeleteSeo: r.isCompeleteSeo,
    link: "#sample-link" /** @todo change link to dynamic with {r.foodRecipeKey} and {baseURL} */,
  }));
  const recipesLen = recipes.length;
  const loading = navigation.state === "loading";
  setTotal(data.total);

  return loading ? (
    <div className="grid place-items-center h-full">
      <Spinner size="m" />
    </div>
  ) : recipes.length === 0 ? (
    <div className="grid place-items-center h-full">
      <EmptyState
        className="self-center"
        size={"l"}
        description={"داده ای برای نمایش وجود ندارد"}
        imgSrc={EmptyStateImage}
      />
    </div>
  ) : (
    recipes.map((recipe, i) => (
      <ItemRow
        key={recipe.key}
        data={recipe}
        locales={["fa", "en"]}
        actions={["copy", "delete"]}
        divider={i < recipesLen - 1}
        link={recipe.link}
      />
    ))
  );
};
export default RecipeListPage;
