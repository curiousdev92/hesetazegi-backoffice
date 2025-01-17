"use client";

import {
  ChangeEvent,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  useRef,
} from "react";
import Avatar from "../Avatar";
import Divider from "../Divider";
import FontIcon from "../FontIcon";

interface PropTypes {
  id: string;
  size: "s" | "m" | "l";
  label?: string;
  content?: string;
  supportingText?: string;
  startIcon?: string;
  endIcon?: string;
  avatar?: string;
  clear?: boolean;
  placeholder?: string;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
  type: HTMLInputTypeAttribute;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  align?: "center" | "start";
  required?: boolean;
}

export default function TextField(props: PropTypes) {
  const {
    id,
    size,
    label,
    content,
    supportingText,
    startIcon,
    endIcon,
    avatar,
    clear,
    placeholder,
    disabled,
    success,
    error,
    name,
    value,
    onChange,
    defaultValue,
    type = "text",
    onKeyDown,
    align,
    required,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const inputStyles = {
    s: "py-1.5 px-2 rounded-lg text-body-md",
    m: "py-2.5 px-3 rounded-xl text-body-md",
    l: "py-3 px-4 rounded-2xl text-body-lg",
  };

  const labelStyles = {
    s: "text-label-md",
    m: "text-label-md",
    l: "text-label-lg",
  };

  const borderStyles = {
    s: "rounded-lg",
    m: "rounded-xl",
    l: "rounded-2xl",
  };

  const contentStyles = {
    s: "ps-2 text-body-sm",
    m: "ps-3 text-body-sm",
    l: "ps-4 text-body-md",
  };

  function clearText() {
    inputRef.current && (inputRef.current.value = "");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
  }

  return (
    <label
      htmlFor={id}
      className={`flex flex-col text-label-primary grow relative z-[1] ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {/* Label */}
      {label ? (
        <span className={`mb-2 ${labelStyles[size]}`}>{label}</span>
      ) : null}

      {/* Input & Actions */}
      <div className={`flex items-center gap-2 relative ${inputStyles[size]}`}>
        {startIcon ? (
          <FontIcon
            icon={startIcon}
            className={`text-label-tertiary ${
              size === "l" ? "text-[1.5rem] w-6" : "text-[1.25rem] w-5"
            }`}
          />
        ) : null}

        <input
          type={type}
          id={id}
          className={`bg-transparent grow peer ${
            align === "center" ? "text-center" : ""
          }`}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          required={required}
        />
        <div
          className={`absolute left-0 w-full h-full ring-[1.3px] ${
            success
              ? "ring-border-basePrimary"
              : error
              ? "ring-system-danger"
              : "ring-border-secondary peer-focus:ring-border-basePrimary"
          } ring-inset transition bg-system-white peer-hover:bg-gray-50 -z-[1] peer-disabled:peer-hover:bg-transparent ${
            borderStyles[size]
          }`}
        ></div>

        <div className="flex gap-2 items-center peer-placeholder-shown:[&>button]:invisible peer-placeholder-shown:[&>button]:opacity-0">
          {avatar ? (
            <Avatar size={size === "l" ? 24 : 20} img={avatar} />
          ) : null}

          <button
            type="button"
            onClick={clear ? clearText : undefined}
            className="flex transition-[opacity,visibility,transform] duration-300"
          >
            {clear && inputRef?.current?.value ? (
              <FontIcon
                icon="close"
                className={
                  size === "l" ? "text-[1.5rem] w-6" : "text-[1.25rem] w-5"
                }
              />
            ) : null}
            {success || error ? (
              <FontIcon
                icon={success ? "tick-circle-bold" : error ? "info-bold" : ""}
                className={`${
                  success
                    ? "text-border-basePrimary"
                    : error
                    ? "text-system-danger"
                    : ""
                } ${size === "l" ? "text-[1.5rem] w-6" : "text-[1.25rem] w-5"}`}
              />
            ) : null}
          </button>

          {/* Size=Small (32px), State=Enabled, Type=Placeholder RIght */}
          {content ? (
            <div className={`flex relative ${contentStyles[size]}`}>
              <Divider
                vertical="vertical2"
                verticalType="middle-inset"
                className={"absolute right-0 top-1/2 -translate-y-1/2"}
              />
              {content}
            </div>
          ) : null}
        </div>
      </div>

      {/* Supporting Text */}
      {supportingText ? (
        <span
          className={`pt-1 text-body-sm ${
            success
              ? "text-border-basePrimary"
              : error
              ? "text-system-danger"
              : "text-label-secondary"
          } ${size === "s" ? "px-2" : "px-3"}`}
        >
          {supportingText}
        </span>
      ) : null}
    </label>
  );
}
