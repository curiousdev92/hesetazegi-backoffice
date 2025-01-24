import Divider from "@src/components/Divider";
import FontIcon from "@src/components/FontIcon";
import { motion } from "motion/react";
import { FC, MouseEventHandler, ReactNode, useState } from "react";

type ItemType = { title: string; key: string; content: ReactNode };
type PropTypes = { items: ItemType[] };

const CategoriesAccordion: FC<PropTypes> = (props) => {
  const { items } = props;
  const [selected, setSelected] = useState<string>(items[0].key);

  const onItemClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const { id } = e.currentTarget;
    setSelected(id === selected ? "" : id);
  };

  return (
    <ul className="flex flex-col gap-3 py-3">
      {items.map((c) => (
        <li key={c.key} className="select-none">
          <div
            id={c.key}
            onClick={onItemClick}
            className="rounded-lg py-2 px-3 flex items-center gap-2 cursor-pointer"
          >
            <FontIcon
              icon="arrow-down"
              className={`transition-transform duration-300 ${
                selected === c.key ? "rotate-180" : ""
              }`}
            />
            <p className="text-label-primary text-label-md">{c.title}</p>
          </div>
          <motion.ul
            initial={false}
            className="overflow-clip"
            animate={{
              height: selected === c.key ? "auto" : 0,
              opacity: selected === c.key ? 1 : 0,
            }}
          >
            {c.content}
          </motion.ul>
          <Divider
            horizontal="horizontal1"
            horizontalType="full-width"
            className="mt-3"
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoriesAccordion;
