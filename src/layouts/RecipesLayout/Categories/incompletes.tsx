import FilterMenu from "@src/components/FilterMenu";
import { FC } from "react";

type PropTypes = {};

const Incompletes: FC<PropTypes> = (props) => {
  const {} = props;

  const items = [
    { key: "miss-content", label: "محتوا" },
    { key: "miss-media", label: "رسانه" },
    { key: "miss-seo", label: "سئو" },
  ];

  return <FilterMenu items={items} />;
};

export default Incompletes;
