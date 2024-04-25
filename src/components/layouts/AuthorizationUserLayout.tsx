import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import path from "../../constants/path";
import Footer from "../Footer";
import { useAppSelector } from "../../redux/hooks";
import local from "../../constants/local";

const AuthorizationUserLayout = () => {
  const isAuth = localStorage.getItem(local.TOKEN);

  if (!isAuth) {
    return <Navigate to={path.LOGIN} />;
  }
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthorizationUserLayout;
