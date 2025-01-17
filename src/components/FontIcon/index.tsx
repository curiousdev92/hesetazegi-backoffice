import { FC } from "react";

type PropTypes = { icon: string; className?: string };

const FontIcon: FC<PropTypes> = (props) => {
  const { icon, className } = props;

  return <i className={`icon-${icon} ${className}`}></i>;
};
export default FontIcon;
