import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { userServices } from "../services";
import local from "../constants/local";
import path from "../constants/path";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const LoginGoogle = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const query = urlSearchParams.toString();

  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const handleLoginGoogle = async () => {
    const res: any = await userServices.loginGoogleCallback(query);
    localStorage.setItem(local.TOKEN, res.access_token);
    dispatch(login());
  };

  useEffect(() => {
    handleLoginGoogle();
  }, []);

  // const isAuth = localStorage.getItem(local.TOKEN);
  // console.log(isAuth);
  if (isLoggedIn) {
    return <Navigate to={path.HOME} />;
  }
};

export default LoginGoogle;
