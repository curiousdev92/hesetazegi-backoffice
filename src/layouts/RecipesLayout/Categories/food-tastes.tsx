import FilterMenu from "@src/components/FilterMenu";
import { GET } from "@src/services";
import { TASTE_LIST } from "@src/utils/urls";
import { FC, useLayoutEffect, useState } from "react";

type PropTypes = {};

const FoodTastes: FC<PropTypes> = (props) => {
  const {} = props;

  const [items, setItems] = useState<ItemType[]>([]);

  const fetchTastes = async () => {
    try {
      const tastes: TasteItemType[] = await GET(`${TASTE_LIST}/fa`);
      setItems(tastes.map((m) => ({ label: m.title, key: m.key })));
    } catch (error) {}
  };

  useLayoutEffect(() => {
    fetchTastes();
  }, []);

  return <FilterMenu items={items} />;
};

export default FoodTastes;
