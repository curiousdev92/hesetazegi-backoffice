import { MouseEventHandler, ReactNode } from "react";
import Avatar from "../Avatar";
import FontIcon from "../FontIcon";
import IconButton from "../IconButton";

interface ChipsProps {
  size: "s" | "m" | "l";
  label: ReactNode;
  startIcon?: string;
  endIcon?: string;
  avatar?: boolean;
  avatarImg?: string;
  icon?: string;
  disabled?: boolean;
  variant: "gray" | "primary" | "secondary";
  onClose?: (data: ChipsProps["data"]) => void;
  data?: any;
  onClick?: (data: ChipsProps["data"]) => void;
  outline?: boolean;
  fullWidth?: boolean;
}

export default function Chips(props: ChipsProps) {
  const {
    label,
    size,
    variant,
    avatar,
    disabled,
    endIcon,
    icon,
    startIcon,
    avatarImg,
    onClose,
    data,
    onClick,
    outline = true,
    fullWidth,
  } = props;

  const ps = {
    s: avatar ? 4 : startIcon ? 6 : label ? 8 : 4,
    m: avatar ? 4 : startIcon ? 8 : label ? 12 : 6,
    l: avatar ? 4 : startIcon ? 12 : label ? 20 : 10,
  };
  const pe = {
    s: endIcon ? 6 : label ? 8 : 4,
    m: endIcon ? 8 : label ? 12 : 6,
    l: endIcon ? 12 : label ? 20 : 10,
  };

  const avatarSize = { s: 16, m: 24, l: 32 } as any;

  const pb = { s: 4, m: 6, l: 10 };

  const gap = {
    s: !avatar && !(startIcon && endIcon) ? 2 : 4,
    m: 4,
    l: 8,
  };

  const variants = {
    gray: `bg-system-white ring-border-secondary text-label-primary ${
      onClick ? "[&:not(:disabled)]:hover:bg-gray-50" : ""
    }`,
    primary: `bg-primary-50 ring-border-basePrimary text-label-basePrimary ${
      onClick ? "[&:not(:disabled)]:hover:text-primary-700" : ""
    }`,
    secondary: `bg-secondary-50 ring-border-baseSecondary text-label-baseSecondary ${
      onClick ? "[&:not(:disabled)]:hover:text-secondary-700" : ""
    }`,
  };

  const sizes = {
    s: "text-body-sm",
    m: "text-body-md",
    l: "text-body-md",
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClose && onClose(data);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClick && onClick(data);
  };

  return icon && label ? (
    <div className="text-system-danger">
      Both icon and label cannot be passed at the same time, choose one
    </div>
  ) : (
    <div
      role="button"
      className={`${
        fullWidth ? "w-full" : "w-fit"
      } relative overflow-hidden select-none transition duration-[0.1s] subpixel-antialiased flex justify-center items-center h-fit disabled:opacity-50 rounded-full ${
        outline ? "ring-1" : ""
      } ring-inset ${variants[variant]} ${sizes[size]} ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      style={{
        paddingInlineStart: ps[size],
        paddingInlineEnd: pe[size],
        paddingBlock: pb[size],
        gap: gap[size],
      }}
      onClick={handleClick}
    >
      {startIcon ? (
        <FontIcon
          icon={startIcon}
          className={size === "s" ? "text-[1rem]" : "text-[1.25rem]"}
        />
      ) : avatar ? (
        <Avatar img={avatarImg} size={avatarSize[size]} />
      ) : null}
      {icon ? (
        <FontIcon
          className={size === "s" ? "text-[1rem]" : "text-[1.25rem]"}
          icon={icon}
        />
      ) : (
        <span className="">{label}</span>
      )}
      {endIcon ? (
        <IconButton
          className={size === "s" ? "text-[1rem]" : "text-[1.25rem]"}
          icon={endIcon}
          clickHandler={handleClose}
        />
      ) : null}
    </div>
  );
}
