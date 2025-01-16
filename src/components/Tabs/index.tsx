import { motion } from "motion/react";
import { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
import Badge from "../Badge";

type PropTypes = {
  items: TabItem[];
  onTabChange?: (key?: TabItem["key"]) => void;
};

const Tabs: FC<PropTypes> = (props) => {
  /**
   * @todo This component is not yet complete
   */
  const { items, onTabChange } = props;
  const { tab } = useParams();
  const defaultTab = tab ?? items[0].key;
  const [selected, setSelected] = useState<string | undefined>(defaultTab);

  const handleSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as EventTarget & HTMLDivElement;
    const { dataset } = target;
    if (e.currentTarget.contains(target)) {
      setSelected(dataset.key);
      if (onTabChange) onTabChange(dataset.key);
    }
  };

  return (
    <div className="flex relative" role="tablist" onClick={handleSelect}>
      {items.map(({ key, label, count, icon }) => (
        <button
          role="tab"
          type="button"
          key={key}
          id={`tab-${key}`}
          data-key={key}
          tabIndex={key === selected ? 0 : -1}
          className={`py-3 px-2 flex items-center h-12 gap-2 text-label-md relative hover:text-label-basePrimary
            ${
              key === selected
                ? "text-label-basePrimary"
                : "text-label-secondary"
            }
        `}
        >
          {label}
          {count ? (
            <Badge
              size="sm"
              type="number"
              variant={key === selected ? "primary" : "disable"}
              label={count}
            />
          ) : null}

          {/* indicator */}
          <motion.span
            initial={{ opacity: 0, bottom: -4 }}
            animate={{
              opacity: key === selected ? 1 : 0,
              bottom: key === selected ? 0 : -4,
            }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={
              "absolute w-full h-1 bg-border-basePrimary rounded-t-3xl bottom-0 will-change-[bottom,opacity] left-0"
            }
          ></motion.span>

          {/* Thumb */}
          <div
            className="absolute left-0 top-0 right-0 bottom-0"
            data-key={key}
          ></div>
        </button>
      ))}
    </div>
  );
};
export default Tabs;
