import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface CheckoutFormStateType {
  name: string | undefined;
  phone: string | undefined;
  province: string | undefined;
  district: string | undefined;
  ward: string | undefined;
  address: string | undefined;
  payment_method: string | undefined;
}

const defaultValues: CheckoutFormStateType = {
  phone: "",
  name: "",
  province: "",
  district: "",
  ward: "",
  address: "",
  payment_method: "",
};

const schema = Yup.object({
  name: Yup.string().trim().required("Đây là trường bắt buộc"),
  phone: Yup.string().trim().required("Đây là trường bắt buộc"),
  province: Yup.string().trim().required("Đây là trường bắt buộc"),
  district: Yup.string().trim().required("Đây là trường bắt buộc"),
  ward: Yup.string().trim().required("Đây là trường bắt buộc"),
  address: Yup.string().trim().required("Đây là trường bắt buộc"),
  payment_method: Yup.string().trim().required("Đây là trường bắt buộc"),
});

type FormType = Yup.InferType<typeof schema>;

export default function useCheckoutForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormType>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, formState, reset };
}
