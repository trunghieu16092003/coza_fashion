import React, { useEffect, useState, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import local from "../../../constants/local";
import InputField from "../../../components/InputField";
import useProductForm from "../../../hooks/product/useProductForm";
import { categoryServices } from "../../../services";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProduct, updateProduct } from "../../../redux/product/asyncAction";
import path from "../../../constants/path";

interface ICategories {
  cat_id: string;
  cat_name: string;
}

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<ICategories[] | null>(null);
  const [editor, setEditor] = useState("");
  const { register, handleSubmit, formState, reset, setValue } =
    useProductForm();

  const getCategories = async () => {
    const res: any = await categoryServices.getCategory();
    setCategories(res.data);
  };

  const onSubmit = async (data: any) => {
    const res = { ...data, p_desc: editor };
    dispatch(updateProduct({ id: id, data: res }));
    await dispatch(getProduct({}));
    const page = localStorage.getItem(local.PAGE);
    navigate(`${path.ADMIN}/${path.PRODUCT_MANAGEMENT}?page=${page}`);
    // try {
    //   const response = await productInventory.add(request);
    //   if (response.success) {
    //     toast.success(response.message);
    //     const currentPage: any = searchParams.get("page");
    //     if (currentPage == 1) {
    //       updateInventories(productId);
    //       updatePaginations(productId, "", currentPage);
    //     } else {
    //       const currentParams = new URLSearchParams(window.location.search);
    //       currentParams.set("page", "1");
    //       navigate({
    //         pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}/view/${id}`,
    //         search: currentParams.toString(),
    //       });
    //     }
    //   }
    // } catch (error: any) {
    //   if (error.response && error.response.data) {
    //     notifyError(error.response.data.message);
    //   }
    // }
  };

  useEffect(() => {
    getCategories();
    dispatch(getProduct({ id: id }));
  }, []);

  useEffect(() => {
    if (products) {
      const product: any = products.find(
        (product: any) => product.pid.toString() === id
      );
      if (product) {
        const category = categories?.find(
          (category: any) => category.cat_name === product.cat_name
        )?.cat_id;
        setValue("cat_id", category || "");
        setEditor(product.p_desc);
      }
    }
  }, [categories]);

  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Thêm sản phẩm</h1>

      <div className="flex items-center">
        {products &&
          products.map((product: any, index) => (
            <form key={index} action="" onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Tên sản phẩm"
                type="text"
                id="p_name"
                value={product.p_name}
                errors={formState.errors.p_name?.message}
                register={register("p_name")}
              />
              <div className="mb-4">
                <label
                  htmlFor="cat_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Danh mục
                </label>
                <select
                  {...register("cat_id")}
                  id="cat_id"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn danh mục</option>
                  {categories &&
                    categories?.map((category: any, index: number) => (
                      <option key={index} value={category.cat_id}>
                        {category?.cat_name}
                      </option>
                    ))}
                </select>
                <span className="text-red-600 block">
                  {formState.errors.cat_id?.message}
                </span>
              </div>

              <CKEditor
                editor={ClassicEditor}
                data={editor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditor(data);
                }}
              />

              <InputField
                label="Giá thành"
                type="text"
                id="p_price"
                value={product.p_price}
                errors={formState.errors.p_price?.message}
                register={register("p_price")}
              />

              <InputField
                label="Giảm giá"
                type="text"
                id="discount"
                value={product.discount}
                errors={formState.errors.discount?.message}
                register={register("discount")}
              />
              <button className="bg-blue-600 text-white text-lg font-semibold p-2 rounded-md">
                Thêm danh mục
              </button>
            </form>
          ))}
      </div>
    </div>
  );
};

export default memo(EditProduct);
