import { FC } from "react";
import { Navigate, Outlet } from "react-router";
import { getCookie } from "../utils/cookies";

const ProtectRoutes: FC = () => {
  const token = getCookie("bo-tkn");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoutes;
