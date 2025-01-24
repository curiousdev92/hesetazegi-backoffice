import { ChangeEventHandler, ReactNode } from "react";

type PropTypes = {
  id: string;
  name: string;
  variant: "circle" | "square";
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
  data?: any;
  onChange?: (data: PropTypes["data"], checked?: boolean) => void;
  checked?: boolean;
  label?: ReactNode;
};

const CheckIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.41211 3.96887L3.95911 6.51587L9.06211 1.42188"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.31152 0.96875H8.51152"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Checkbox(props: PropTypes) {
  const {
    id,
    name,
    variant = "square",
    disabled,
    indeterminate,
    required,
    defaultChecked,
    onChange,
    data,
    checked,
    label,
  } = props;

  const checkedStyles =
    "peer-checked:ring-primary-500 peer-checked:bg-primary-500 peer-checked:[&>svg]:block";
  const indeterminateStyles =
    "peer-indeterminate:ring-label-secondary peer-indeterminate:bg-label-secondary peer-indeterminate:[&>svg]:block";
  const hoverStyles =
    "hover:bg-gray-50 hover:peer-checked:bg-primary-400 hover:peer-checked:ring-primary-400 hover:peer-indeterminate:bg-label-tertiary hover:peer-indeterminate:ring-label-tertiary";

  const variants = {
    circle: "rounded-3xl",
    square: "rounded-md",
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    const { checked } = e.currentTarget;
    if (onChange && data) {
      onChange(data, checked);
    }
  };

  return (
    <label
      htmlFor={id}
      className={`flex items-center w-fit  gap-2 ${
        disabled ? "cursor-default" : "cursor-pointer"
      } relative p-0.5`}
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        className="hidden peer"
        disabled={disabled}
        required={required}
        aria-required={required}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        aria-checked={checked}
        checked={checked}
      />
      <div
        className={`flex justify-center items-center ${variants[variant]} w-5 h-5 text-system-white ring-[1.5px] transition ring-inset ring-gray-300 peer-disabled:opacity-50 [&>svg]:hidden ${checkedStyles} ${indeterminateStyles} ${hoverStyles}`}
      >
        {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
      </div>
      {label}
    </label>
  );
}
