import FilterMenu from "@src/components/FilterMenu";
import { FC } from "react";

type PropTypes = {};

const FoodSeason: FC<PropTypes> = (props) => {
  const {} = props;
  // const [items, setItems] = useState<ItemType[]>([]);

  // const fetchSeasons = async () => {
  //   try {
  //     const sesons: SeasonItemType[] = await GET(`${SEASON_LIST}/fa`);
  //     console.log("sesons", sesons);
  //     setItems(sesons.map((m) => ({ label: m.seasonTitle, key: m.seasonKey })));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Food Season");

  //   fetchSeasons();
  // }, []);

  const items = [
    { label: "تمامی فصول", key: "ssn-all" },
    { label: "زمستان", key: "ssn-winter" },
    { label: "پاییز", key: "ssn-autmn" },
    { label: "تابستان", key: "ssn-summer" },
    { label: "بهار", key: "ssn-sping" },
  ];

  return <FilterMenu items={items} />;
};

export default FoodSeason;
