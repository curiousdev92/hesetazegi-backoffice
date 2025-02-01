import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";
import FontIcon from "../FontIcon";

type AttrType = InputHTMLAttributes<HTMLInputElement>;

type PropTypes = {
  name?: AttrType["name"];
  id: AttrType["id"];
  size: "s" | "m";
  checked?: AttrType["checked"];
  hasIcon?: boolean;
  onCheck?: ChangeEventHandler<HTMLInputElement>;
  defaultChecked?: AttrType["defaultChecked"];
  value?: AttrType["value"];
  disabled?: AttrType["disabled"];
};

const Switch: FC<PropTypes> = (props) => {
  const {
    id,
    size,
    checked,
    name,
    onCheck,
    hasIcon,
    defaultChecked,
    value,
    disabled,
  } = props;

  const sizes = {
    s: "w-10 h-6",
    m: "w-14 h-8",
  };

  return (
    <label
      htmlFor={id}
      className={`relative cursor-pointer flex ${sizes[size]}`}
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        className="hidden peer"
        onChange={onCheck}
        checked={checked}
        defaultChecked={defaultChecked}
        value={value}
        disabled={disabled}
      />
      <div
        className={`absolute w-full h-full rounded-full peer-checked:bg-primary-500 bg-gray-200 transition-colors`}
      ></div>
      <div
        className={`flex justify-center items-center bg-system-white shadow-switch rounded-full transition-[right,left] delay-[0s,_0.08s] peer-checked:delay-[0.08s,_0s] ease-in-out duration-[0.2s,_0.3s] peer-checked:duration-[0.3s,_0.2s] absolute top-0.5 right-0.5 peer-checked:left-0.5 ${
          size === "s"
            ? "left-[calc(100%-22px)] peer-checked:right-[calc(100%-22px)] h-5 [&>i]:text-base"
            : "left-[calc(100%-30px)] peer-checked:right-[calc(100%-30px)] h-7 [&>i]:text-xl"
        } peer-checked:[&>.icon-tick]:opacity-100 peer-checked:[&>.icon-tick]:scale-100 peer-checked:[&>.icon-close]:opacity-0 peer-checked:[&>.icon-close]:scale-0`}
      >
        {hasIcon ? (
          <>
            <FontIcon
              icon="tick"
              className="absolute opacity-0 scale-0 transition duration-300"
            />
            <FontIcon
              icon="close"
              className="absolute transition duration-300"
            />
          </>
        ) : null}
      </div>
    </label>
  );
};

export default Switch;
