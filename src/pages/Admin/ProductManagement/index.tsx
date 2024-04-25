import React, { useEffect, useState, memo } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaEdit, FaRegBuilding } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Pagination } from "antd";

import path from "../../../constants/path";
import local from "../../../constants/local";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProduct } from "../../../redux/product/asyncAction";
import { productServices } from "../../../services";

const ProductManagement = () => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [paginations, setPaginations] = useState([]);

  let currentPage: any = searchParams.get("page") || null;
  let keyword = searchParams.get("q") || "";
  const navigate = useNavigate();
  const getPaginations = async () => {
    if (currentPage) {
      const res: any = await productServices.getProducts("", currentPage);
      setPaginations(res.data);
    } else {
      const res: any = await productServices.getProducts("", 1);
      setPaginations(res.data);
    }
  };

  const handleDelete = async (id: any) => {
    await productServices.delete(id, 0);
    if (keyword) {
      getResponseSearch();
    } else {
      getPaginations();
    }
  };

  const handleRestore = async (id: any) => {
    await productServices.delete(id, 1);
    if (keyword) {
      getResponseSearch();
    } else {
      getPaginations();
    }
  };

  const getResponseSearch = async () => {
    if (currentPage) {
      const res: any = await productServices.getProducts(
        "",
        currentPage,
        keyword
      );
      setPaginations(res.data);
    } else {
      const res: any = await productServices.getProducts("", 1, keyword);
      setPaginations(res.data);
    }
  };

  const handleSearch = async () => {
    navigate({
      pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}`,
      search: createSearchParams({
        q: search,
        page: currentPage || 1,
      }).toString(),
    });
  };

  function handleSearchEnter(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  }

  const handlePageChange = async (page: any) => {
    if (keyword) {
      navigate({
        pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}`,
        search: createSearchParams({ q: keyword, page }).toString(),
      });
      localStorage.setItem(local.PAGE, String(page) ?? "1");
      getResponseSearch();
    } else {
      navigate({
        pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}`,
        search: createSearchParams({ page }).toString(),
      });
      localStorage.setItem(local.PAGE, String(page) ?? "1");
      getPaginations();
    }
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setSearch(keyword);
        if (keyword) {
          dispatch(getProduct({ id: "", page: null, keyword: keyword }))
            .unwrap()
            .catch((error) => {
              alert(error);
            });
          getResponseSearch();
        } else {
          dispatch(getProduct({}));
          getPaginations();
        }
      } catch (error: any) {
        console.error("Lỗi trong component:", error);
      }
    };

    fetchData();
  }, [searchParams, dispatch, currentPage]);

  return (
    <div className="w-full pl-5 mt-6 relative">
      <div>
        <h1 className="font-bold text-2xl mb-6">Quản lý sản phẩm</h1>
        <div className="flex items-center mb-6 justify-between">
          <form className="flex mr-4 flex-col">
            <h2 className="font-bold text-xl mb-0">Tìm kiếm</h2>
            <div>
              <input
                type="text"
                value={search}
                placeholder="Nhập từ khóa, ID"
                className="text-base p-2 border outline-none border-gray-300 rounded-md "
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
        </div>

        <table className="w-full border text-center">
          <thead>
            <tr>
              <th className="py-2 border">#</th>
              <th className="py-2 border">STT</th>
              <th className="py-2 border">ID</th>
              <th className="py-2 border">Tên sản phẩm</th>
              <th className="py-2 border">Tên danh mục</th>
              <th className="py-2 border">Mô tả</th>
              <th className="py-2 border">Giá thành</th>
              <th className="py-2 border">Khuyễn mãi</th>
              <th className="py-2 border">Đánh giá</th>
              <th className="py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginations &&
              paginations?.map((pagination: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 border">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="py-2 border">{index + 1}</td>
                  <td className="py-2 border">{pagination?.pid}</td>
                  <td className="py-2 border">{pagination?.p_name}</td>
                  <td className="py-2 border">{pagination?.cat_name}</td>
                  <td
                    className="py-2 border"
                    dangerouslySetInnerHTML={{ __html: pagination?.p_desc }}
                  ></td>
                  <td className="py-2 border">{pagination?.p_price}</td>
                  <td className="py-2 border">{pagination?.discount}</td>
                  <td className="py-2 border">{pagination?.rating}</td>

                  <td className="py-2 border flex justify-center">
                    {pagination.is_disabled ? (
                      <div className="flex justify-center">
                        <span className="mr-2 bg-yellow-500 text-2xl p-1 cursor-pointer rounded">
                          <Link
                            to={`${path.ADMIN}/products/view/${pagination?.pid}`}
                          >
                            <FaRegBuilding className="text-white" />
                          </Link>
                        </span>
                        <span className="mr-2 bg-blue-500 text-2xl p-1 cursor-pointer rounded">
                          <Link
                            to={`${path.ADMIN}/${path.PRODUCT_MANAGEMENT}/${pagination.pid}/edit`}
                          >
                            <FaEdit className="text-white" />
                          </Link>
                        </span>
                        <span
                          title="Xóa"
                          className="bg-red-500 text-2xl p-1 cursor-pointer rounded"
                          onClick={() => handleDelete(pagination.pid)}
                        >
                          <MdDelete className="text-white" />
                        </span>
                      </div>
                    ) : (
                      <div onClick={() => handleRestore(pagination.pid)}>
                        Khôi phục
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          total={products?.length}
          current={currentPage}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(ProductManagement);
