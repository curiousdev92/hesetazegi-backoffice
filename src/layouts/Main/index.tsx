import PageLoading from "@src/layouts/PageLoading";
import { useStore } from "@src/store";
import { hasPermission, normalizePermissions } from "@src/utils/permissions";
import { Outlet, useLoaderData, useNavigation } from "react-router";
import HeaderLayout from "../Header";
import SideMenu from "../SideMenu";

export default function MainLayout() {
  const data: { menu: MenuEntity; permissions: PermissionItemType[] } =
    useLoaderData();
  const setMenu = useStore((st) => st.setMenu);
  const menu = useStore((st) => st.menu);
  const setPermissions = useStore((st) => st.setPermissions);
  const permissions = useStore((st) => st.permissions);
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  const normalizedPermissions = normalizePermissions(data.permissions);

  !menu?.length && setMenu(data.menu);
  !Object.keys(permissions).length && setPermissions(normalizedPermissions);

  console.log(hasPermission("md-bo-recipe-list-draft", "delete"));

  return (
    <div
      className="grid grid-cols-[auto_1fr] h-full"
      style={{ direction: "rtl" }} /** @todo Make this dynamic with I18n */
    >
      <SideMenu />

      <main className="grow max-h-full overflow-hidden grid grid-rows-[5rem_1fr] bg-content-secondary">
        <HeaderLayout />
        {loading ? <PageLoading /> : null}
        <div className="bg-content-primary border border-border-secondary rounded-2xl overflow-hidden m-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
