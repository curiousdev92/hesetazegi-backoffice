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

type recipeStatuseType = {
  code: number;
  count: number;
  isMain: boolean;
  label: string;
};
type recipeStatusesType = recipeStatuseType[];
