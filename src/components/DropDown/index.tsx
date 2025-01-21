import { FC, MouseEventHandler, useState } from "react";
import Button from "../Button";
import FontIcon from "../FontIcon";
import Menu from "../Menu";
import Popover from "../Popover";

interface DropDownProps {
  items: ItemType[];
  size: "m" | "l";
  onSelect?: (item: ItemType) => void;
  fullWidth?: boolean;
}

const DropDown: FC<DropDownProps> = (props) => {
  const { items, size, onSelect, fullWidth } = props;
  const [selected, setSelected] = useState<ItemType>();

  const handleSelect: MouseEventHandler<HTMLLIElement> = (e) => {
    const { id } = e.currentTarget;
    const selectedItem = items.find((it) => it.key === id);
    if (onSelect && selectedItem) {
      onSelect(selectedItem);
      setSelected(selectedItem);
    }
  };

  return (
    <Popover
      anchorElement={
        <Button
          size={size}
          variant={"outline"}
          label={selected?.label || "انتخاب کنید"}
          fullWidth={fullWidth}
          endIcon={<FontIcon icon="arrow-down" />}
        />
      }
      content={
        <Menu size={size}>
          {items.map(({ label, key }) => (
            <li
              key={key}
              id={key}
              onClick={handleSelect}
              role="button"
              className="text-label-primary text-body-md py-1.5 px-3 hover:bg-gray-50 rounded-md text-start"
            >
              {label}
            </li>
          ))}
        </Menu>
      }
      offset={4}
    />
  );
};

export default DropDown;
