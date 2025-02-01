import AdminsLayout from "@src/layouts/AdminsLayout";
import ErrorLayout from "@src/layouts/Error";
import MainLayout from "@src/layouts/Main";
import PageLoading from "@src/layouts/PageLoading";
import RecipesLayout from "@src/layouts/RecipesLayout";
import WeblogsLayout from "@src/layouts/WeblogsLayout";
import AdminCreatePage from "@src/pages/Admins/create";
import AdminEditPage from "@src/pages/Admins/edit";
import AdminListPage from "@src/pages/Admins/list";
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
import { getAdminDetail } from "@src/services/getAdminDetail";
import { getAdminList } from "@src/services/getAdminList";
import { getAdminRoles } from "@src/services/getAdminRoles";
import { getInitData } from "@src/services/getinitData";
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
        loader: getInitData,
        shouldRevalidate: () => false,
        children: [
          { index: true, element: <Navigate to="/dashboard" /> },
          { path: "dashboard", element: <DashboardPage /> },
          // Recipe
          {
            path: "recipes",
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

          // Weblog
          {
            path: "weblogs",
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

          // QA
          { path: "qa", element: <QAPage /> },

          // Admin Management
          {
            path: "admin-management",
            element: <AdminsLayout />,

            children: [
              {
                index: true,
                loader: getAdminList,
                element: (
                  <Suspense>
                    <AdminListPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "admin-management/create",
            element: <AdminCreatePage />,
            loader: getAdminRoles,
          },
          {
            path: "admin-management/:adminID",
            element: <AdminEditPage />,
            loader: async (req) => {
              return {
                roles: await getAdminRoles(),
                data: await getAdminDetail(req.params.adminID as string),
              };
            },
          },

          // Role Management
          { path: "role-management", element: <RoleManagementPage /> },
        ],
      },
    ],
  },
  { path: "401", element: <UnAuthorizedPage /> },
  { path: "403", element: <ForbiddenPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "", element: <NotFoundPage /> },
]);

export default router;
