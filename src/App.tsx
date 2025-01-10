import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import MainLayout from "./layouts/Main";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import ProtectRoutes from "./routes/protect-routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* Non auth Pages */}
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
