import PageTransition from "@src/animations/PageTransition";
import ItemRow from "@src/layouts/ItemRow";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { recipesPageLimit } from "@src/utils/constants";
import { formatNumber } from "@src/utils/helpers";
import { FC } from "react";
import { useLoaderData } from "react-router";

type PropTypes = {};

const RecipesPage: FC<PropTypes> = () => {
  const data = useLoaderData() as { total: number; records: FoodRecipeItem[] };
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

  const tabItems: TabItem[] = [
    { label: "پیش نویس", key: "draft", count: formatNumber(43, "fa") },
    { label: "ارزیابی", key: "evaluate", count: formatNumber(78, "fa") },
    { label: "صف انتشار", key: "queue", count: formatNumber(157, "fa") },
    { label: "منتشر شده", key: "published", count: formatNumber(275, "fa") },
  ];

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        filters={[]}
        filterTitle="فیلتر و دسته‌بندی" /** @todo change text with translated texts */
        tabItems={tabItems}
        title="لیست دستور پخت" /** @todo change text with translated texts */
        sortComponent={<div>Sort dropdown</div> /** @todo Use DropDown here */}
        total={data.total}
        limit={recipesPageLimit}
        items={recipes.map((recipe, i) => (
          <ItemRow
            key={recipe.key}
            data={recipe}
            locales={["fa", "en"]}
            actions={["copy", "delete"]}
            divider={i < recipesLen - 1}
            link={recipe.link}
          />
        ))}
      />
    </PageTransition>
  );
};
export default RecipesPage;
