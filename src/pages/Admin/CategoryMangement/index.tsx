import React, { useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { categoryServices } from "../../../services";
import path from "../../../constants/path";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getCategories = async () => {
    const res: any = await categoryServices.getCategory();
    setCategories(res.data);
  };

  const handleDelete = async (id: string) => {
    await categoryServices.deleteCategory(id);
    getCategories();
  };

  const handleSearch = async () => {
    try {
      const res: any = await categoryServices.searchCategory(search);
      setCategories(res.data);
      navigate({
        pathname: `${path.ADMIN}/${path.CATEGORY_MANAGEMENT}`,
        search: createSearchParams({ q: search }).toString(),
      });
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message);
      }
    }
  };

  function handleSearchEnter(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keyword = searchParams.get("q") || "";
        setSearch(keyword);

        if (keyword) {
          const res: any = await categoryServices.searchCategory(keyword);
          setCategories(res.data);
        } else {
          const res: any = await categoryServices.getCategory();
          setCategories(res.data);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.message);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Quản lý danh mục</h1>
      <form className="mb-6 ">
        <h2 className="font-bold text-xl mb-4 mr-4">Tìm kiếm</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={search}
            placeholder="Nhập từ khóa, ID"
            className="text-base p-2 border outline-none border-gray-300 rounded-md"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={handleSearchEnter}
          />
          <button
            className="bg-blue-600 text-white text-lg font-semibold p-2 ml-2 rounded-md"
            onClick={handleSearch}
            type="button"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      <table className="w-full border text-center">
        <thead>
          <tr>
            <th className="py-2 border">#</th>
            <th className="py-2 border">STT</th>
            <th className="py-2 border">ID</th>
            <th className="py-2 border">Tên danh mục</th>
            <th className="py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category: any, index: number) => (
              <tr key={index}>
                <td className="py-2 border">
                  <input type="checkbox" name="" id="" />
                </td>
                <td className="py-2 border">{index + 1}</td>
                <td className="py-2 border">{category.id}</td>
                <td className="py-2 border">{category.name}</td>
                <td className="py-2 border flex justify-center">
                  <span className="mr-2 bg-blue-500 text-2xl p-1 cursor-pointer rounded">
                    <Link to={`/admin/list-category/${category.id}/edit`}>
                      <FaEdit className="text-white" />
                    </Link>
                  </span>
                  <span
                    title="Xóa"
                    className="bg-red-500 text-2xl p-1 cursor-pointer rounded"
                    onClick={() => handleDelete(category.id)}
                  >
                    <MdDelete className="text-white" />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
