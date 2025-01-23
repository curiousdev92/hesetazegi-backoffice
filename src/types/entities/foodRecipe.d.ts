type FoodRecipeItem = {
  creationDate: number;
  recipeTitle: string;
  isCompeleteContent: boolean;
  isCompeleteMedia: boolean;
  isCompeleteSeo: boolean;
  image: string;
  foodRecipeKey: string;
};

type RecipesDataType = { total: number; records: FoodRecipeItem[] };
type recipeStatusesType = {
  code: number;
  count: number;
  isMain: boolean;
  label: string;
}[];
