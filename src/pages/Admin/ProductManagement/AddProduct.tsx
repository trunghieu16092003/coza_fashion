import React, { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputField from "../../../components/InputField";
import useProductForm from "../../../hooks/product/useProductForm";
import { categoryServices } from "../../../services";
import { useAppDispatch } from "../../../redux/hooks";
import { addProduct, getProduct } from "../../../redux/product/asyncAction";
import path from "../../../constants/path";

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [editor, setEditor] = useState("");

  const getCategories = async () => {
    const res: any = await categoryServices.getCategory();
    setCategories(res.data);
  };

  const onSubmit = async (data: any) => {
    const res = { ...data, p_desc: editor };
    await dispatch(addProduct(res));
    navigate(`${path.ADMIN}/${path.PRODUCT_MANAGEMENT}`);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const { register, handleSubmit, formState } = useProductForm();
  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Thêm sản phẩm</h1>

      <div className="flex items-center">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Tên sản phẩm"
            type="text"
            id="p_name"
            errors={formState.errors.p_name?.message}
            register={register("p_name")}
          />
          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Danh mục
            </label>
            <select
              {...register("cat_id")}
              id="color"
              className="mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Chọn danh mục</option>
              {categories &&
                categories?.map((category: any, colorIndex: number) => (
                  <option key={colorIndex} value={category.cat_id}>
                    {category.cat_name}
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
            errors={formState.errors.p_price?.message}
            register={register("p_price")}
          />

          <InputField
            label="Giảm giá"
            type="text"
            id="discount"
            errors={formState.errors.discount?.message}
            register={register("discount")}
          />
          <button className="bg-blue-600 text-white text-lg font-semibold p-2 rounded-md">
            Thêm danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
