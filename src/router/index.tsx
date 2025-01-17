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
import { getRecipes } from "@src/services/getRecipes";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    element: <ProtectRoutes />,
    hydrateFallbackElement: <HydrateFallbackLayout />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorLayout />,
        loader: getMenu,
        shouldRevalidate: () => false,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "/dashboard", element: <DashboardPage /> },
          {
            path: "/recipes",
            element: <RecipesPage />,
            loader: getRecipes,
            hydrateFallbackElement: <HydrateFallbackLayout />,
          },
          { path: "/qa", element: <QAPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
