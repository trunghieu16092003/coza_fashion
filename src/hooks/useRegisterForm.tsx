import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface RegisterFormStateType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: RegisterFormStateType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = Yup.object({
  username: Yup.string().trim().required("Đây là trường bắt buộc"),
  email: Yup.string().trim().required("Đây là trường bắt buộc"),
  password: Yup.string()
    .required("Đây là trường bắt buộc")
    .min(8, "Mật khẩu phải có tối đa 8 kí tự"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), "not compare"]),
});

type FormType = Yup.InferType<typeof schema>;

export default function useRegisterForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, formState, reset };
}
