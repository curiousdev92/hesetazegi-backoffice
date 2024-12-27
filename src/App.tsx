import { Route, Routes } from "react-router";
import MainLayout from "./layouts/Main";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
