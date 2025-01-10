import isAuth from "@src/utils/auth";
import { FC } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectRoutes: FC = () => {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoutes;
