import PageTransition from "@src/animations/PageTransition";
import ItemRow from "@src/layouts/ItemRow";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { recipesPageLimit } from "@src/utils/constants";
import { formatNumber, updateURLParams } from "@src/utils/helpers";
import { motion } from "motion/react";
import { FC } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";

type PropTypes = {};
type RecipesDataType = { total: number; records: FoodRecipeItem[] };
type StatusesDataType = {
  code: number;
  count: number;
  isMain: boolean;
  label: string;
}[];

const RecipeListPage: FC<PropTypes> = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, statuses } = useLoaderData() as {
    data: RecipesDataType;
    statuses: StatusesDataType;
  };
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
  const tabItems: TabItem[] = statuses.map((st) => ({
    label: st.label,
    key: String(st.code),
    count: formatNumber(st.count, "fa"),
  }));

  const renderRecipeItems = recipes.map((recipe, i) => (
    <motion.div
      key={recipe.key}
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.02 * i }}
    >
      <ItemRow
        data={recipe}
        locales={["fa", "en"]}
        actions={["copy", "delete"]}
        divider={i < recipesLen - 1}
        link={recipe.link}
      />
    </motion.div>
  ));

  const handleTabChange: (key?: TabItem["key"]) => void = (tab) => {
    const changedURL = updateURLParams("status", String(tab));
    if (tab) navigate(changedURL);
  };

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
        loading={navigation.state === "loading"}
        items={renderRecipeItems}
        onTabChange={handleTabChange}
      />
    </PageTransition>
  );
};
export default RecipeListPage;
