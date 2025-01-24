import FilterMenu from "@src/components/FilterMenu";
import { GET } from "@src/services";
import { COOKING_METHOD_LIST } from "@src/utils/urls";
import { FC, useLayoutEffect, useState } from "react";

type PropTypes = {};

const CookingMethod: FC<PropTypes> = (props) => {
  const {} = props;

  const [items, setItems] = useState<ItemType[]>([]);

  const fetchCookingMethods = async () => {
    try {
      const cookingMethods: CookingMethodItemType[] = await GET(
        `${COOKING_METHOD_LIST}/fa`
      );
      setItems(cookingMethods.map((m) => ({ label: m.title, key: m.key })));
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchCookingMethods();
  }, []);

  return <FilterMenu items={items} />;
};

export default CookingMethod;
