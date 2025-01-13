import { FC } from "react";

type PropTypes = {};

const HeaderLayout: FC<PropTypes> = (props) => {
  const {} = props;

  return (
    <header className="flex justify-between items-center h-20 p-4 border-b border-border-tertiary">
      <div>BreadCrumbs</div>
      <div>LanguageSwitcher</div>
    </header>
  );
};
export default HeaderLayout;
