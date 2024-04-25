import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface InventoryFormStateType {
  color_id: string;
  size_id: string;
  quantity_buy: number | undefined;
}

const defaultValues: InventoryFormStateType = {
  color_id: "",
  size_id: "",
  quantity_buy: undefined,
};

const schema = Yup.object({
  color_id: Yup.string().trim().required("Đây là trường bắt buộc"),
  size_id: Yup.string().trim().required("Đây là trường bắt buộc"),
  quantity_buy: Yup.mixed()
    .test("is-required", "Trường bắt buộc", function (value) {
      return value !== undefined && value !== null && value !== "";
    })
    .test("is-number", "Phải nhập số", function (value: any) {
      return !isNaN(value);
    })
    .required("Trường bắt buộc"),
});

type FormType = Yup.InferType<typeof schema>;

export default function useEditInventoryForm() {
  const { register, handleSubmit, formState, reset, setValue } =
    useForm<FormType>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  return { register, handleSubmit, formState, reset, setValue };
}
