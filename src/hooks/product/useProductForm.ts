import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export interface IProduct {
  pid: number | undefined;
  cat_id: string;
  p_name: string;
  p_desc: string;
  p_price: number | undefined;
  discount: number | undefined;
}

const defaultValues: IProduct = {
  pid: undefined,
  cat_id: "",
  p_name: "",
  p_desc: "",
  p_price: undefined,
  discount: undefined,
};

const schema = Yup.object({
  cat_id: Yup.string().trim().required("Đây là trường bắt buộc"),
  p_name: Yup.string().trim().required("Đây là trường bắt buộc"),
  p_price: Yup.mixed()
    .test("is-required", "Trường bắt buộc", function (value) {
      return value !== undefined && value !== null && value !== "";
    })
    .test("is-number", "Phải nhập số", function (value: any) {
      return !isNaN(value);
    })
    .required("Trường bắt buộc"),
  discount: Yup.mixed()
    .test("is-required", "Trường bắt buộc", function (value) {
      return value !== undefined && value !== null && value !== "";
    })
    .test("is-number", "Phải nhập số", function (value: any) {
      return !isNaN(value);
    })
    .required("Trường bắt buộc"),
});

type FormType = Yup.InferType<typeof schema>;

export default function useProductForm() {
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<FormType>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  return { register, handleSubmit, formState, reset, setValue };
}
