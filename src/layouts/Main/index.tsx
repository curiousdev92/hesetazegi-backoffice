import { Outlet } from "react-router";
import SideMenu from "../SideMenu";

export default function MainLayout() {
  return (
    <div className="flex h-full" style={{ direction: "rtl" }}>
      <SideMenu />

      <main className="grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
