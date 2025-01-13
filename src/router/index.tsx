import PageTransition from "@src/animations/PageTransition";
import ErrorLayout from "@src/layouts/Error";
import HydrateFallbackLayout from "@src/layouts/HydrateFallback";
import MainLayout from "@src/layouts/Main";
import DashboardPage from "@src/pages/Dashboard";
import LoginPage from "@src/pages/Login";
import NotFoundPage from "@src/pages/NotFound";
import QAPage from "@src/pages/QuestionAnswer";
import RecipesPage from "@src/pages/Recipes";
import ProtectRoutes from "@src/router/protect-routes";
import { getMenu } from "@src/services/getMenu";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    element: <ProtectRoutes />,
    hydrateFallbackElement: <HydrateFallbackLayout />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorLayout />,
        hydrateFallbackElement: <HydrateFallbackLayout />,
        loader: getMenu,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          {
            path: "/dashboard",
            element: (
              <PageTransition key={"dashboard"}>
                <DashboardPage />
              </PageTransition>
            ),
          },
          {
            path: "/recipes",
            element: (
              <PageTransition key={"recipes"}>
                <RecipesPage />
              </PageTransition>
            ),
          },
          {
            path: "/qa",
            element: (
              <PageTransition key={"qa"}>
                <QAPage />
              </PageTransition>
            ),
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
