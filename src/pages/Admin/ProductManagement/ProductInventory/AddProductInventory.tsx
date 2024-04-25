import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import useInventoryForm from "../../../../hooks/inventory/useInventoryForm";
import {
  sizeServices,
  colorServices,
  productInventory,
} from "../../../../services";
import InputField from "../../../../components/InputField";
import path from "../../../../constants/path";

interface IAddInventoryProps {
  onClose: () => void;
  updateInventories: (id: string) => void;
  updatePaginations: (id: string, inventoryId: string, page: number) => void;
  productId: any;
}

interface IColor {
  id: string;
  color_name: string;
  code: string;
}

interface ISize {
  id: string;
  name: string;
}

const AddProductInventory = memo(
  ({
    onClose,
    updateInventories,
    updatePaginations,
    productId,
  }: IAddInventoryProps) => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [colors, setColors] = useState<IColor[] | null>(null);
    const [sizes, setSizes] = useState<ISize[] | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useInventoryForm();

    const fetchData = async () => {
      const colorData: any = await colorServices.getColor();
      const sizeData: any = await sizeServices.getSize();
      setColors(colorData.data);
      setSizes(sizeData.data);
    };

    useEffect(() => {
      fetchData();
    }, []);

    const onSubmit = async (data: any) => {
      const request = { ...data, product_id: id };
      try {
        const response = await productInventory.add(request);
        if (response.success) {
          onClose();
          toast.success(response.message);
          const currentPage: any = searchParams.get("page");
          if (currentPage == 1) {
            updateInventories(productId);
            updatePaginations(productId, "", currentPage);
          } else {
            const currentParams = new URLSearchParams(window.location.search);
            currentParams.set("page", "1");
            navigate({
              pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}/view/${id}`,
              search: currentParams.toString(),
            });
          }
        }
      } catch (error: any) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        }
      }
    };

    return (
      <div className="w-full pl-5 mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
              >
                <option value="">Chọn màu</option>
                {colors &&
                  colors?.map((color: any, colorIndex: number) => (
                    <option key={colorIndex} value={color.id}>
                      {color.color_name}
                    </option>
                  ))}
              </select>
              <span className="text-red-600 block">
                {formState.errors.color_id?.message}
              </span>
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
                <option value="">Kích thước</option>
                {sizes &&
                  sizes?.map((size: any, sizeIndex: number) => (
                    <option key={sizeIndex} value={size.id}>
                      {size.name}
                    </option>
                  ))}
              </select>
              <span className="text-red-600 block">
                {formState.errors.size_id?.message}
              </span>
            </div>
            <InputField
              label="Số lượng hàng tồn kho"
              type="text"
              id="quantity_buy"
              errors={formState.errors.quantity_buy?.message}
              register={register("quantity_buy")}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default AddProductInventory;
