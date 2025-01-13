import { useStore } from "@src/store";
import { Outlet, useLoaderData } from "react-router";
import HeaderLayout from "../Header";
import SideMenu from "../SideMenu";

export default function MainLayout() {
  const data = useLoaderData();
  const setMenu = useStore((st) => st.setMenu);

  setMenu(data);

  return (
    <div className="flex h-full" style={{ direction: "rtl" }}>
      <SideMenu />

      <main className="grow max-h-full overflow-hidden grid grid-rows-[5rem_1fr]">
        <HeaderLayout />
        <div className="p-4 bg-content-secondary grid">
          <div className="bg-content-primary border border-border-secondary rounded-2xl overflow-hidden">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
