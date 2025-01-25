import ErrorLayout from "@src/layouts/Error";
import MainLayout from "@src/layouts/Main";
import PageLoading from "@src/layouts/PageLoading";
import RecipesLayout from "@src/layouts/RecipesLayout";
import WeblogsLayout from "@src/layouts/WeblogsLayout";
import AdminManagementPage from "@src/pages/AdminManagement";
import DashboardPage from "@src/pages/Dashboard";
import ForbiddenPage from "@src/pages/ForbiddenPage";
import LoginPage from "@src/pages/Login";
import NotFoundPage from "@src/pages/NotFound";
import QAPage from "@src/pages/QuestionAnswer";
import RecipeListPage from "@src/pages/Recipe/list";
import RoleManagementPage from "@src/pages/RoleManagement";
import UnAuthorizedPage from "@src/pages/UnAuthorizedPage";
import WeblogListPage from "@src/pages/Weblog/list";
import ProtectRoutes from "@src/router/protect-routes";
import { getMenu } from "@src/services/getMenu";
import { getPermissions } from "@src/services/getPermissions";
import { getRecipesStatuses } from "@src/services/getRecipesStatuses";
import { getWeblogsRequirements } from "@src/services/getWeblogsRequirements";
import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    element: <ProtectRoutes />,
    HydrateFallback: () => <PageLoading />,
    children: [
      {
        element: <MainLayout />,
        loader: async () => {
          const requirements = {
            menu: await getMenu(),
            permissions: await getPermissions(),
          };
          return requirements;
        },
        shouldRevalidate: () => false,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "/dashboard", element: <DashboardPage /> },
          {
            path: "/recipes",
            element: <RecipesLayout />,
            loader: getRecipesStatuses,
            shouldRevalidate: () => false,
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading recipes...</p>}>
                    <RecipeListPage />
                  </Suspense>
                ),
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
                element: (
                  <ErrorLayout>
                    <Suspense fallback={<p>Loading weblogs...</p>}>
                      <WeblogListPage />
                    </Suspense>
                  </ErrorLayout>
                ),
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
  { path: "/401", element: <UnAuthorizedPage /> },
  { path: "/403", element: <ForbiddenPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
