import { getCookie } from "@src/utils/cookies";
import { FC } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectRoutes: FC = () => {
  const token = getCookie("bo-tkn");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoutes;
