import dashboardIcon from "@src/assets/images/dashboard.svg";
import { useStore } from "@src/store";
import { FC, useState } from "react";
import { NavLink } from "react-router";

type PropTypes = {};

const SideMenu: FC<PropTypes> = (props) => {
  const {} = props;
  const [show, setShow] = useState(true);
  const menu = useStore((st) => st.menu);
  const animateClass = show
    ? "grid-cols-[3.5rem_200px]"
    : "grid-cols-[3.5rem_0px]";

  const toggleMenu = () => setShow(!show);

  return (
    <aside
      className={`grid grid-flow-row grid-rows-[5rem_1fr_76px] overflow-hidden transition-[grid-template-columns] duration-500 text-label-baseWhite bg-primary-800 ${animateClass}`}
    >
      <div className="col-start-1 col-end-3 row-start-1 bg-gradient-to-l from-[#99A41B] to-system-primary"></div>
      <button
        className="row-start-1 col-start-1"
        onClick={toggleMenu}
        type="button"
      >
        &#9776;
      </button>

      {/* Header */}
      <header className="row-start-1 col-start-2">Logo</header>

      {/* Content - Dynamic Menu */}
      <ul className="row-start-2 col-start-1 col-end-3 relative overflow-hidden text-nowrap py-4 flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.key}
            to={item.route}
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-system-yellow [&>li]:bg-primary-700"
                : "text-label-baseWhite"
            }
          >
            <li className="py-3 px-4 flex gap-4">
              <img src={dashboardIcon} alt={item.title} />
              {item.title}
            </li>
          </NavLink>
        ))}

        {/* Layer Blur */}
        <div className="bg-[rgba(199,176,0,0.3)] absolute w-64 h-64 bottom-0 rounded-full left-1/2 translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
      </ul>

      {/* Footer */}
      <footer className="row-start-3 col-start-1 col-end-3">Logout</footer>
    </aside>
  );
};
export default SideMenu;
