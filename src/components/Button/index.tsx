import { ReactNode } from "react";
import Spinner from "../Spinner";

interface PropType {
  size: "s" | "m" | "l" | "xl";
  variant: "filled" | "tonal" | "outline" | "dashed" | "texted" | "danger";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: ReactNode;
  type?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  gradient?: boolean;
  animated?: boolean;
  loading?: boolean;
  id?: string;
  error?: boolean;
  fullWidth?: boolean;
}

export default function Button(props: PropType) {
  const {
    size = "m",
    variant = "filled",
    onClick,
    startIcon,
    endIcon,
    icon,
    label,
    children,
    className,
    disabled = false,
    gradient = false,
    type = "button",
    animated,
    loading,
    id,
    error,
    fullWidth,
    ...rest
  } = props;

  const sizeClasses = {
    s: `h-6 rounded text-body-sm gap-0.5 ${
      startIcon
        ? "ps-1 pe-2 py-1"
        : endIcon
        ? "ps-2 pe-1 py-1"
        : icon
        ? "p-0.5"
        : "px-2 py-1"
    }`,
    m: `h-8 rounded-lg text-body-md gap-1 ${
      startIcon
        ? "ps-1 pe-2 py-1.5"
        : endIcon
        ? "ps-2 pe-1 py-1.5"
        : icon
        ? "p-1.5"
        : "px-3 py-1.5"
    }`,
    l: `h-10 rounded-xl text-body-md gap-2 ${
      startIcon
        ? "ps-2 pe-3 py-2.5"
        : endIcon
        ? "ps-3 pe-2 py-2.5"
        : icon
        ? "p-2.5"
        : "px-5 py-2.5"
    }`,
    xl: `h-12 rounded-2xl text-body-lg gap-2 ${
      startIcon
        ? "py-3 ps-3 pe-4"
        : endIcon
        ? "py-3 ps-4 pe-3"
        : icon
        ? "p-3.5"
        : "py-3 px-6"
    }`,
  };

  const variantClasses = {
    filled: `text-system-white ${!disabled ? "hover:bg-primary-400" : ""} ${
      gradient ? "bg-systemGradient-to-r1" : "bg-system-primary"
    }`,

    tonal: `bg-primary-50 border text-label-basePrimary ${
      error ? "border-system-danger" : "border-border-baseWhite"
    } ${!disabled ? "hover:border-border-basePrimary" : ""}`,

    outline: `bg-transparent text-label-primary border ${
      error
        ? "border-system-danger"
        : gradient
        ? "border-gradient"
        : "border-border-secondary"
    } ${!disabled ? "hover:bg-gray-50" : ""}`,

    dashed: `bg-transparent border border-dashed text-label-primary ${
      error
        ? "border-system-danger"
        : gradient
        ? "border-gradient"
        : "border-border-secondary"
    } ${!disabled ? "hover:bg-gray-50" : ""}`,

    texted: `bg-transparent text-system-primary border-none ${
      !disabled ? "hover:bg-primary-50" : ""
    } ${
      gradient ? "bg-clip-text text-transparent bg-systemGradient-to-r1" : ""
    }`,

    danger: `bg-transparent text-system-danger border ${
      error
        ? "border-system-danger"
        : gradient
        ? "border-gradient"
        : "border-border-secondary"
    } ${!disabled ? "hover:bg-gray-50" : ""}`,
  };

  const HandelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
  };

  return (
    <button
      id={id}
      onClick={HandelClick}
      type={type}
      {...rest}
      className={`flex items-center justify-center relative overflow-hidden
      ${sizeClasses[size]} ${variantClasses[variant]} ${className}
       ${
         disabled || loading ? "opacity-30 cursor-default" : "cursor-pointer"
       } ${fullWidth ? "w-full" : ""} transition-all duration-200`}
      disabled={disabled || loading}
    >
      {startIcon || null}
      {children || label ? (
        <span
          className={`${
            gradient && variant === "tonal"
              ? "text-transparent bg-clip-text bg-systemGradient-to-r1"
              : ""
          }`}
        >
          {loading ? <Spinner size={"s"} /> : children || label}
        </span>
      ) : null}
      {endIcon || null}
      {icon ? icon : null}
      <span
        className={`absolute top-1/2  bg-system-white h-[200%] rounded-full -translate-y-1/2 translate-x-full rotate-[30deg] ${
          animated ? "shadow-shine animate-shineX" : ""
        } `}
      ></span>
    </button>
  );
}
