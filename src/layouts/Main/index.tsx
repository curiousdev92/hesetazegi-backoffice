import { NavLink, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex h-full">
      <aside className="bg-gray-300 p-4 basis-[20%]">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
        </ul>
      </aside>

      <div className="grow p-4">
        <Outlet />
      </div>
    </div>
  );
}
