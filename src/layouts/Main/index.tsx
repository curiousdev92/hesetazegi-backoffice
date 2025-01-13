import { useStore } from "@src/store";
import { Outlet, useLoaderData } from "react-router";
import SideMenu from "../SideMenu";

export default function MainLayout() {
  const data = useLoaderData();
  const setMenu = useStore((st) => st.setMenu);

  setMenu(data);

  return (
    <div className="flex h-full" style={{ direction: "rtl" }}>
      <SideMenu />

      <main className="grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
