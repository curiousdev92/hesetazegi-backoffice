import { FC, ReactNode } from "react";

type PropTypes = {
  size: "m" | "l";
  children: ReactNode[];
};

const Menu: FC<PropTypes> = (props) => {
  const { size, children } = props;

  return (
    <ul
      className="border border-border-secondary p-2 flex flex-col gap-1 overflow-auto bg-system-white"
      style={{ borderRadius: size === "l" ? 12 : 8 }}
    >
      {children}
    </ul>
  );
};

export default Menu;
