import { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import local from "../../../../constants/local";

import {
  sizeServices,
  colorServices,
  productInventory,
} from "../../../../services";
import InputField from "../../../../components/InputField";
import useEditInventoryForm from "../../../../hooks/inventory/useEditInventoryForm";
import path from "../../../../constants/path";

interface IColor {
  id: string;
  color_name: string;
  code: string;
}

interface ISize {
  id: string;
  name: string;
}

function EditProductInventory() {
  const { id, params } = useParams();
  const [colors, setColors] = useState<IColor[] | null>(null);
  const [sizes, setSizes] = useState<ISize[] | null>(null);
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } =
    useEditInventoryForm();

  const onSubmit = async (data: any) => {
    const res = { ...data, product_id: id };
    const page = localStorage.getItem(local.PAGE);
    await productInventory.update(id, params, res);
    success("cập nhật thành công");
    navigate(
      `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}/view/${id}?page=${page}`
    );
  };

  const success = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const fetchData = async () => {
    const res: any = await productInventory.getIntventory(id, params);
    const colorData: any = await colorServices.getColor();
    const sizeData: any = await sizeServices.getSize();
    setInventories(res.data);
    setColors(colorData.data);
    setSizes(sizeData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inventories) {
      const inventory: any = inventories.find(
        (inv: any) => inv.id.toString() === params
      );
      if (inventory) {
        const colorId = colors?.find(
          (color) => color.color_name === inventory.color
        )?.id;
        const sizeId = sizes?.find((size: any) => size.name === inventory.size)
          ?.id;

        setValue("color_id", colorId || "");
        setValue("size_id", sizeId || "");
      }
    }
  }, [params, colors, sizes]);

  return (
    <div className="w-full pl-5 mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Màu sắc
          </label>
          <select
            {...register("color_id")}
            id="color"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => console.log(e.target.value)}
          >
            {colors &&
              colors?.map((color: any, colorIndex: number) => (
                <option key={colorIndex} value={color.id}>
                  {color?.color_name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            Kích thước
          </label>
          <select
            {...register("size_id")}
            id="size"
            className="mt-1 p-2 border border-gray-300 rounded-md"
          >
            {sizes &&
              sizes?.map((size: any, sizeIndex: number) => (
                <option key={sizeIndex} value={size.id}>
                  {size?.name}
                </option>
              ))}
          </select>
        </div>

        {inventories.map((inventory: any, index) => (
          <div key={index}>
            <InputField
              label="Số lượng hàng tồn kho"
              type="text"
              id="quantity_buy"
              value={inventory.quantity_buy}
              errors={formState.errors.quantity_buy?.message}
              register={register("quantity_buy")}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default memo(EditProductInventory);
