import { FC, InputHTMLAttributes, ReactNode } from "react";
import FontIcon from "../FontIcon";

type AttrType = InputHTMLAttributes<HTMLInputElement>;
interface TextFieldProps {
  size?: "small" | "medium" | "large";
  state?: "default" | "error" | "success" | "disabled";
  label?: string;
  placeholder?: AttrType["placeholder"];
  supportingText?: string;
  startIcon?: string;
  avatar?: ReactNode;
  endIcon?: string;
  content?: ReactNode;
  value?: AttrType["value"];
  onChange?: AttrType["onChange"];
  disabled?: AttrType["disabled"];
  center?: boolean;
  readOnly?: AttrType["readOnly"];
  id?: AttrType["id"];
  name?: AttrType["name"];
}

export const TextField: FC<TextFieldProps> = (props) => {
  const {
    size = "medium",
    state = "default",
    label,
    placeholder,
    supportingText,
    startIcon,
    avatar,
    endIcon,
    content,
    value,
    onChange,
    disabled = false,
    center,
    readOnly,
    id,
    name,
  } = props;

  const sizeClasses = {
    small: "py-1.5 px-2 text-body-md rounded-lg h-8",
    medium: "py-2.5 px-3 text-body-md rounded-xl h-10",
    large: "py-3 px-4 text-body-lg rounded-2xl h-12",
  };

  const stateClasses = {
    default: "border-border-secondary",
    error: "border-system-danger",
    success: "border-system-success",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const interactionClasses = disabled
    ? stateClasses.disabled
    : `${stateClasses[state]} focus-within:border-border-basePrimary`;

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className="mb-2 text-label-primary" htmlFor={id}>
          {label}
        </label>
      )}
      {/* Input Container */}
      <div
        className={`relative flex items-center border transition group ${sizeClasses[size]} ${interactionClasses}`}
      >
        {/* Start Icon */}
        {startIcon && (
          <FontIcon
            icon={startIcon}
            className={`text-label-tertiary ${
              size === "large" ? "text-2xl h-6" : "text-xl h-5"
            } ${size === "small" ? "me-1" : "me-2"}`}
          />
        )}

        {/* Input */}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-transparent outline-none me-2 ${
            center ? "text-center" : ""
          }`}
          aria-invalid={state === "error"}
          aria-describedby={supportingText ? `${id}-description` : undefined}
          readOnly={readOnly}
          name={name}
        />
        {/* Content/Avatar/End Icon */}
        <div className="flex items-center gap-2">
          {avatar && <div className="">{avatar}</div>}
          {endIcon && (
            <FontIcon
              icon={endIcon}
              className={`text-label-tertiary ${
                size === "large" ? "text-2xl h-6" : "text-xl h-5"
              }`}
            />
          )}
          {content && (
            <>
              <div className="border-l border-border-secondary h-4" />
              <span className="text-label-primary">{content}</span>
            </>
          )}
        </div>
      </div>
      {/* Supporting Text */}
      {supportingText && (
        <span
          id={`${id}-description`}
          className="mt-1 text-sm text-label-tertiary"
        >
          {supportingText}
        </span>
      )}
    </div>
  );
};

export default TextField;
