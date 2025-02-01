import { AnimatePresence, motion } from "motion/react";
import { FC, useState } from "react";

type PropTypes = {};

const DashboardPage: FC<PropTypes> = (props) => {
  const {} = props;
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const handleItemClick = (item: string) => {
    setItems((prevItems) => {
      const filteredItems = prevItems.filter((i) => i !== item);
      return [item, ...filteredItems];
    });
  };

  return (
    <div>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer bg-white p-4 my-2 rounded-lg shadow hover:bg-gray-200"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
      {/* <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((item) => (
          <Reorder.Item key={item} value={item}>
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group> */}
    </div>
  );
};
export default DashboardPage;
