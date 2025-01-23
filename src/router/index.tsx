import ErrorLayout from "@src/layouts/Error";
import HydrateFallbackLayout from "@src/layouts/HydrateFallback";
import MainLayout from "@src/layouts/Main";
import RecipesLayout from "@src/layouts/RecipesLayout";
import WeblogsLayout from "@src/layouts/WeblogsLayout";
import AdminManagementPage from "@src/pages/AdminManagement";
import DashboardPage from "@src/pages/Dashboard";
import LoginPage from "@src/pages/Login";
import NotFoundPage from "@src/pages/NotFound";
import QAPage from "@src/pages/QuestionAnswer";
import RecipeListPage from "@src/pages/Recipe/list";
import RoleManagementPage from "@src/pages/RoleManagement";
import WeblogListPage from "@src/pages/Weblog/list";
import ProtectRoutes from "@src/router/protect-routes";
import { getMenu } from "@src/services/getMenu";
import { getRecipes } from "@src/services/getRecipes";
import { getRecipesRequirements } from "@src/services/getRecipesRequirements";
import { getWeblogs } from "@src/services/getWeblogs";
import { getWeblogsRequirements } from "@src/services/getWeblogsRequirements";
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
            element: <RecipesLayout />,
            loader: getRecipesRequirements,
            shouldRevalidate: () => false,
            hydrateFallbackElement: <HydrateFallbackLayout />,
            children: [
              {
                index: true,
                element: <RecipeListPage />,
                loader: getRecipes,
                shouldRevalidate: () => true,
              },
            ],
          },
          {
            path: "/weblogs",
            element: <WeblogsLayout />,
            loader: getWeblogsRequirements,
            shouldRevalidate: () => false,
            children: [
              {
                index: true,
                element: <WeblogListPage />,
                loader: getWeblogs,
              },
            ],
          },
          { path: "/qa", element: <QAPage /> },
          { path: "/admin-management", element: <AdminManagementPage /> },
          { path: "/role-management", element: <RoleManagementPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
