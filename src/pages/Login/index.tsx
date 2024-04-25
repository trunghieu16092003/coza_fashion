import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import InputField from "../../components/InputField";
import useLoginForm from "../../hooks/useLoginForm";
import { userServices } from "../../services";
import local from "../../constants/local";
import path from "../../constants/path";
import { login } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Login = () => {
  const [googleUrl, setgoogleUrl] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const res: any = await userServices.login(data);
    localStorage.setItem(local.TOKEN, res.access_token);
    dispatch(login());
    navigate(path.HOME);
  };

  const { register, handleSubmit, formState } = useLoginForm();

  const getGoogleUrl = async () => {
    const res: any = await userServices.loginGoogle();
    setgoogleUrl(res.url);
  };

  useEffect(() => {
    getGoogleUrl();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Tên đăng nhập"
            type="text"
            id="username"
            errors={formState.errors.email?.message}
            register={register("email")}
          />

          <InputField
            label="Mật khẩu"
            type="password"
            id="password"
            errors={formState.errors.password?.message}
            register={register("password")}
          />

          <button className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md w-full mt-6">
            Đăng nhập
          </button>
        </form>
        <button className="flex w-full items-center justify-center mt-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md">
          <FcGoogle className="mr-2" />
          <Link to={googleUrl}>Đăng nhập bằng Google</Link>
        </button>

        <p className="mt-2">
          Bạn chưa có tài khoản, đăng ký tại{" "}
          <Link className="text-blue-700" to={path.REGISTER}>
            Đây
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
