import { Navigate, Outlet } from "react-router-dom";

import local from "../../constants/local";
import SidebarRightAdmin from "../SidebarRightAdmin";
import path from "../../constants/path";

const AuthorizationAdminLayout = () => {
  const isAuth = localStorage.getItem(local.TOKEN);
  const role = localStorage.getItem(local.ROLE);

  if (!isAuth) {
    return <Navigate to={path.LOGIN} />;
  }

  if (role && parseInt(role) !== 1) {
    return <Navigate to={path.HOME} />;
  }

  return (
    <div className="flex">
      <SidebarRightAdmin />
      <Outlet />
    </div>
  );
};

export default AuthorizationAdminLayout;
