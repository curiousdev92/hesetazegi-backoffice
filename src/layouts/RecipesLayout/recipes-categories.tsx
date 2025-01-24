import { FC } from "react";
import CategoriesAccordion from "../ListWithFilters/categories-accordion";
import BirthPlace from "./Categories/birth-place";
import CookingMethod from "./Categories/cooking-method";
import FoodCategory from "./Categories/food-category";
import FoodMeal from "./Categories/food-meal";
import FoodSeason from "./Categories/food-season";
import FoodTastes from "./Categories/food-tastes";
import Incompletes from "./Categories/incompletes";
import SkillLevel from "./Categories/skill-level";

type PropTypes = {};

const RecipesCategories: FC<PropTypes> = (props) => {
  const {} = props;

  const categories = [
    { key: "incomplete", title: "تکمیل نشده", content: <Incompletes /> },
    { key: "foodCategory", title: "دسته غذایی", content: <FoodCategory /> },
    { key: "foodMeal", title: "وعده غذایی", content: <FoodMeal /> },
    { key: "foodSeason", title: "انتخاب فصل", content: <FoodSeason /> },
    { key: "skillLevel", title: "سطح مهارت", content: <SkillLevel /> },
    { key: "foodTastes", title: "نوع مزه", content: <FoodTastes /> },
    { key: "cookingMethod", title: "روش پخت", content: <CookingMethod /> },
    { key: "birthPlace", title: "محل زادگاه", content: <BirthPlace /> },
  ];

  return <CategoriesAccordion items={categories} />;
};

export default RecipesCategories;
