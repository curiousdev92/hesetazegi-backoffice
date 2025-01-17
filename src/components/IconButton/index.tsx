import { FC, MouseEventHandler } from "react";
import FontIcon from "../FontIcon";

type PropTypes = {
  icon: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  iconClasses?: string;
  className?: string;
  disabled?: boolean;
};

const IconButton: FC<PropTypes> = (props) => {
  const { clickHandler, icon, iconClasses, className, disabled } = props;

  return (
    <button
      className={`${disabled ? "opacity-50" : ""} ${className}`}
      onClick={clickHandler}
      type="button"
      title={icon}
      disabled={disabled}
    >
      <FontIcon icon={icon} className={iconClasses} />
    </button>
  );
};
export default IconButton;
