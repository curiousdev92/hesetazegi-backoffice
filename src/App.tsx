import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/Main";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProtectRoutes from "./routes/protect-routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>

        {/* Non auth Pages */}
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
