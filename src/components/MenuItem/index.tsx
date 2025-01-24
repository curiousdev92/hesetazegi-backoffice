import { uuid } from "@src/utils/helpers";
import { MouseEventHandler } from "react";
import Avatar from "../Avatar";
import Checkbox from "../Checkbox";
import FontIcon from "../FontIcon";

type PropTypes = {
  active?: boolean;
  error?: boolean;
  disabled?: boolean;
  data: any;
  size: "m" | "s";
  checkbox?: boolean;
  checkboxPosition?: "start" | "end";
  supportingText?: string;
  label?: string;
  onSelect?: (data: PropTypes["data"]) => void;
  avatar?: string;
  icon?: string;
  onCheckbox?: (data: PropTypes["data"], checked?: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
};

export default function MenuItem(props: PropTypes) {
  const {
    active,
    disabled,
    error,
    data,
    size,
    label,
    supportingText,
    onSelect,
    checkboxPosition,
    avatar,
    icon,
    onCheckbox,
    checked,
    checkbox,
    defaultChecked,
  } = props;
  const uid = uuid();

  const handleSelect: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    onSelect && onSelect(data);
  };

  return (
    <li
      className={`px-3 flex gap-2 rounded-lg cursor-pointer relative animate-fadeInDown transition-colors 
        ${size === "m" ? "py-2" : "py-1"}  
        ${disabled ? "opacity-50 cursor-default" : ""} 
        ${
          active
            ? "bg-primary-50"
            : error
            ? "bg-system-danger bg-opacity-30"
            : "bg-system-white hover:bg-gray-50"
        }`}
      aria-selected={active}
      data-value={data.value}
      tabIndex={0}
      role="option"
      onClick={handleSelect}
    >
      {/* indicator */}
      {active ? (
        <div className="absolute right-0 top-2 bottom-2 w-1 rounded-l-3xl bg-primary-500"></div>
      ) : null}

      {/* Avatar */}
      {avatar ? <Avatar img={avatar} size={24} /> : null}

      {/* Icon */}
      {icon ? <FontIcon icon={icon} /> : null}

      {/* Checkbox start */}
      {checkbox && checkboxPosition === "start" ? (
        <Checkbox
          id={uid}
          name={uid}
          variant={"square"}
          data={data}
          onChange={onCheckbox}
          checked={checked}
          defaultChecked={defaultChecked}
        />
      ) : null}

      {/* Label and SupportingText */}
      <div className="py-0.5 flex flex-col gap-0.5">
        <p
          className={`text-body-md 
            ${
              active
                ? "text-label-basePrimary"
                : error
                ? "text-system-danger"
                : "text-label-primary"
            }`}
        >
          {label}
        </p>
        <p className="text-label-secondary text-body-sm">{supportingText}</p>
      </div>

      {/* Checkbox end */}
      <div className="ms-auto flex items-center">
        {checkbox && checkboxPosition === "end" ? (
          <Checkbox
            id={uid}
            name={uid}
            variant={"square"}
            data={data}
            onChange={onCheckbox}
            checked={checked}
            defaultChecked={defaultChecked}
          />
        ) : null}
      </div>
    </li>
  );
}
