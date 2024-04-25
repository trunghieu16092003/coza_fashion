import React from "react";

import local from "../../constants/local";
import { userServices } from "../../services";
import useRegisterForm from "../../hooks/useRegisterForm";
import InputField from "../../components/InputField";

const Register = () => {
  const onSubmit = async (data: any) => {
    const res: any = await userServices.register(data);
  };

  const { register, handleSubmit, formState } = useRegisterForm();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Tên đăng nhập"
            type="text"
            id="username"
            errors={formState.errors.email?.message}
            register={register("username")}
          />

          <InputField
            label="Email"
            type="email"
            id="email"
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

          <InputField
            label="Nhập lại mật khẩu"
            type="password"
            id="confirmPassword"
            errors={formState.errors.confirmPassword?.message}
            register={register("confirmPassword")}
          />

          <button className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md mt-4 w-full">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
