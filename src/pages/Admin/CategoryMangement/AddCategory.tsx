import React, { useState, useEffect, memo } from "react";
import path from "../../../constants/path";
import { categoryServices } from "../../../services";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setCategory(value);
  };

  const handleAdd = async () => {
    await categoryServices.addCategory(category);
    navigate("/admin/list-category");
  };
  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Chỉnh sửa danh mục</h1>

      <div className="flex items-center">
        <input
          type="text"
          name=""
          id=""
          value={category}
          placeholder="Nhập từ khóa, ID"
          className="text-base p-2 border outline-none border-gray-300 rounded-md"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white text-lg font-semibold p-2 ml-2 rounded-md"
          onClick={handleAdd}
        >
          Thêm danh mục
        </button>
      </div>
    </div>
  );
};

export default memo(AddCategory);
