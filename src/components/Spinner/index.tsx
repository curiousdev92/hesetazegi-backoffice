import { FC } from "react";
type PropTypes = { size: "s" | "m" | "l" };

const Spinner: FC<PropTypes> = ({ size = "m" }) => {
  const sizes = {
    s: "w-6 h-6 border-2",
    m: "w-8 h-8 border-4",
    l: "w-10 h-10 border-[6px]",
  };

  return (
    <div
      className={`${sizes[size]} border-transparent rounded-full border-t-zink-200 animate-spin`}
    ></div>
  );
};

export default Spinner;
