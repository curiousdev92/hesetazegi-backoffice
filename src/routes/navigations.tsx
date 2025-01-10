import PageTransition from "@src/animations/PageTransition";
import MainLayout from "@src/layouts/Main";
import DashboardPage from "@src/pages/Dashboard";
import LoginPage from "@src/pages/Login";
import NotFoundPage from "@src/pages/NotFound";
import QAPage from "@src/pages/QuestionAnswer";
import RecipesPage from "@src/pages/Recipes";
import { GET } from "@src/services";
import { useStore } from "@src/store";
import { GET_MENU_URL } from "@src/utils/urls";
import { FC, ReactNode, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import ProtectRoutes from "./protect-routes";

type PropTypes = {};

const DynamicNavigation: FC<PropTypes> = (props) => {
  const {} = props;
  const menu = useStore((st) => st.menu);
  const setMenu = useStore((st) => st.setMenu);

  const elements: { [key: string]: ReactNode } = {
    "/dashboard": <DashboardPage />,
    "/recipes": <RecipesPage />,
    "/qa": <QAPage />,
  };

  async function getMenu() {
    try {
      const menu: MenuEntity = await GET(
        GET_MENU_URL + "/fa",
        undefined,
        undefined,
        "force-cache"
      );
      console.log(menu);
      // const mappedMenu = menu.map
      setMenu(menu);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!menu.length) getMenu();
  }, []);

  return (
    <Routes>
      <Route element={<ProtectRoutes />}>
        <Route element={<MainLayout />}>
          {/* Redirect '/' to '/dashboard' */}
          <Route index element={<Navigate to="/dashboard" />} />

          {/* Dynamic routes from server */}
          {menu.map((item) => (
            <Route
              key={item.key}
              path={item.route}
              element={
                <PageTransition key={item.key}>
                  {elements[item.route]}
                </PageTransition>
              }
            />
          ))}
        </Route>
      </Route>

      {/* Non auth Pages */}
      <Route path="login" element={<LoginPage />} />

      {/* 404 Notfound Page */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default DynamicNavigation;
