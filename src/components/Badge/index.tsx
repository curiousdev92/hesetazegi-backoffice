import { FC } from "react";

type PropTypes = {
  type: "point" | "number" | "default" | "bottom-right" | "bottom-left";
  label?: string | number;
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary" | "danger" | "disable";
};
type VariantClasses = { [Key in PropTypes["variant"]]: string };
type SizeClasses = { [Key in PropTypes["size"]]: string };
type RadiusClasses = { [Key in PropTypes["type"]]: string };

const Badge: FC<PropTypes> = (props) => {
  const { size, type, variant, label } = props;

  const sizes: SizeClasses = {
    lg: "text-body-md py-1.5 px-3 h-8 rounded-full",
    md: "text-body-sm py-1 px-2 h-6 rounded-full",
    sm: `text-label-sm px-1 h-4 ${
      type === "number" ? "rounded-full" : "rounded-[4px]"
    }`,
  };

  const variants: VariantClasses = {
    primary: "bg-system-primary",
    secondary: "bg-system-secondary",
    danger: "bg-system-danger",
    disable: "bg-gray-600",
  };

  const radiuses: RadiusClasses = {
    "bottom-left": "rounded-bl-none",
    "bottom-right": "rounded-br-none",
    default: "",
    number: "",
    point: "h-1.5 w-1.5",
  };

  return (
    <div
      className={`text-label-baseWhite min-w-4 min-h-4 ${sizes[size]} ${variants[variant]} ${radiuses[type]}`}
    >
      {label}
    </div>
  );
};

export default Badge;
