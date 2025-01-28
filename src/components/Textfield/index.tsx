import { ChangeEvent, FC, ReactNode } from "react";
import FontIcon from "../FontIcon";

interface TextFieldProps {
  size?: "small" | "medium" | "large";
  state?: "default" | "error" | "success" | "disabled";
  label?: string;
  placeholder?: string;
  supportingText?: string;
  startIcon?: string;
  avatar?: ReactNode;
  endIcon?: string;
  content?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  center?: boolean;
  readOnly?: boolean;
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
        <label
          className="mb-2 text-label-primary"
          htmlFor={label.replace(/\s+/g, "-").toLowerCase()}
        >
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
          id={label?.replace(/\s+/g, "-").toLowerCase()}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-transparent outline-none me-2 ${
            center ? "text-center" : ""
          }`}
          aria-invalid={state === "error"}
          aria-describedby={
            supportingText
              ? `${label?.replace(/\s+/g, "-").toLowerCase()}-description`
              : undefined
          }
          readOnly={readOnly}
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
          id={`${label?.replace(/\s+/g, "-").toLowerCase()}-description`}
          className="mt-1 text-sm text-label-tertiary"
        >
          {supportingText}
        </span>
      )}
    </div>
  );
};

export default TextField;
