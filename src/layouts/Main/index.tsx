import { useStore } from "@src/store";
import { Outlet, useLoaderData } from "react-router";
import HeaderLayout from "../Header";
import SideMenu from "../SideMenu";

export default function MainLayout() {
  const data = useLoaderData();
  const setMenu = useStore((st) => st.setMenu);
  const menu = useStore((st) => st.menu);

  !menu?.length && setMenu(data);

  return (
    <div
      className="grid grid-cols-[auto_1fr] h-full"
      style={{ direction: "rtl" }} /** @todo Make this dynamic with I18n */
    >
      <SideMenu />

      <main className="grow max-h-full overflow-hidden grid grid-rows-[5rem_1fr] bg-content-secondary">
        <HeaderLayout />
        <div className="bg-content-primary border border-border-secondary rounded-2xl overflow-hidden m-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
