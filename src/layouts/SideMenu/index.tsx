import AdminManagementIcon from "@src/assets/images/adminPage/admin-management.svg?react";
import DashboardIcon from "@src/assets/images/dashboard.svg?react";
import QAIcon from "@src/assets/images/qa.svg?react";
import RecipesIcon from "@src/assets/images/recipes.svg?react";
import WeblogsIcon from "@src/assets/images/weblogs.svg?react";
import Avatar from "@src/components/Avatar";
import IconButton from "@src/components/IconButton";
import SVGElement from "@src/components/SVG";
import { useStore } from "@src/store";
import { motion } from "motion/react";
import { FC, MouseEventHandler, ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type PropTypes = {};

const SideMenu: FC<PropTypes> = (props) => {
  const {} = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const menu = useStore((st) => st.menu);
  const status = useStore((st) => st.adminStatus);
  const inPath = (route: string) => pathname.includes(route);
  const currentIdx = menu.findIndex((m) => inPath(m.route));
  const fullName = `${status?.firstname} ${status?.lastname}`;

  const icons: { [key: string]: ReactNode } = {
    dashboard: <DashboardIcon />,
    "food-recipe": <RecipesIcon />,
    "question-answer": <QAIcon />,
    weblogs: <WeblogsIcon />,
    "admin-management": <AdminManagementIcon />,
  };

  const toggleMenu = () => {
    setShow(!show);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { id } = e.currentTarget;
    id !== pathname && navigate(id);
  };

  const logOut = () => {
    console.log("logOut");
  };

  return (
    <motion.aside
      animate={{ width: show ? 256 : 56 }}
      className={`grid grid-flow-row grid-rows-[5rem_1fr_76px] overflow-hidden text-label-baseWhite bg-primary-800 grid-cols-[3.5rem_200px]`}
    >
      {/* Top gradient */}
      <div className="col-start-1 col-end-3 row-start-1 bg-gradient-to-l from-[#99A41B] to-system-primary border-b border-border-quaternary"></div>

      <IconButton
        icon={"menu"}
        className="row-start-1 col-start-1"
        iconClasses="text-[1.5rem]"
        clickHandler={toggleMenu}
      />

      {/* Header */}
      <header className="row-start-1 col-start-2 self-center">
        Logo{/** @todo replace with i18n */}
      </header>

      {/* Content - Dynamic Menu */}
      <ul className="row-start-2 col-start-1 col-end-3 relative overflow-hidden text-nowrap py-4 flex flex-col gap-2 z-[1]">
        {menu.map((item) => (
          <li key={item.key}>
            <button
              onClick={handleClick}
              id={item.route}
              className={`w-full py-3 px-4 flex gap-4 hover:bg-primary-700 ${
                inPath(item.route)
                  ? "text-system-yellow bg-primary-700"
                  : "text-label-baseWhite"
              }`}
            >
              <SVGElement fillColor={inPath(item.route) ? "#fff500" : "white"}>
                {icons[item.key]}
              </SVGElement>
              <span
                className={`transition-[opacity,visibility] duration-500 ${
                  show ? "delay-200 opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {item.title}
              </span>
            </button>
          </li>
        ))}

        {/* Yellow Indicator */}
        <span
          className="absolute right-0 h-6 w-1 rounded-l-lg bg-system-yellow -translate-y-1/2 transition-[top] duration-300 will-change-[top]"
          style={{ top: 16 + currentIdx * 56 + 24 }}
        />

        {/* Layer Blur */}
        <div className="bg-[rgba(199,176,0,0.3)] -z-[1] absolute w-64 h-64 bottom-0 rounded-full left-1/2 translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
      </ul>

      {/* Footer */}
      <footer
        className="row-start-3 col-start-1 col-end-3 border-t border-[#FFFFFF33] border-opacity-20 grid grid-cols-[40px_minmax(20px,1fr)_40px] items-center gap-3 min-w-fit transition-[padding] duration-300"
        style={{ padding: show ? 16 : "1rem .5rem" }}
      >
        <Avatar img={status?.avatar} size={40} />
        <div className="grow">
          <p
            className="text-label-md text-label-baseWhite mb-1 text-nowrap text-ellipsis overflow-hidden"
            title={fullName}
          >
            {fullName}
          </p>
          <p className="text-body-sm text-label-quaternary text-nowrap text-ellipsis overflow-hidden">
            {status?.position}
          </p>
        </div>
        <IconButton
          icon="logout"
          className="text-system-yellow"
          iconClasses="text-[1.5rem]"
          clickHandler={logOut}
        />
      </footer>
    </motion.aside>
  );
};
export default SideMenu;
