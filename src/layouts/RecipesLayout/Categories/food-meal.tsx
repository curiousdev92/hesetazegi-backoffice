import FilterMenu from "@src/components/FilterMenu";
import { GET } from "@src/services";
import { MEAL_LIST } from "@src/utils/urls";
import { FC, useLayoutEffect, useState } from "react";

type PropTypes = {};

const FoodMeal: FC<PropTypes> = (props) => {
  const {} = props;
  const [items, setItems] = useState<ItemType[]>([]);

  const fetchMeals = async () => {
    try {
      const meals: MealItemType[] = await GET(`${MEAL_LIST}/fa`);
      setItems(meals.map((m) => ({ label: m.title, key: m.key })));
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchMeals();
  }, []);

  return <FilterMenu items={items} />;
};

export default FoodMeal;
