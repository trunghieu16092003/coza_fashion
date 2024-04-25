import { useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Pagination } from "antd";

import "./style.css";
import local from "../../../../constants/local";
import AddProductInventory from "../ProductInventory/AddProductInventory";
import path from "../../../../constants/path";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { productInventory } from "../../../../services";
import {
  addProductImages,
  deleteProductImage,
  getProductImages,
} from "../../../../redux/productImage/asyncAction";

const ProductView = () => {
  const { images } = useAppSelector((state) => state.productImage);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [isModelInventory, setIsModelInventory] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [paginations, setPaginations] = useState([]);

  let currentPage: any = searchParams.get("page");
  console.log(currentPage);
  const navigate = useNavigate();
  const toggleModel = () => {
    setIsModelInventory(!isModelInventory);
  };

  const handleImages = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", id || "");
    const data = Object.fromEntries(formData);
    await dispatch(addProductImages(data));
    dispatch(getProductImages(id));
  };

  const getInventories = async () => {
    const res: any = await productInventory.getIntventory(id);
    setInventories(res.data);
  };

  const getPaginations = async () => {
    if (currentPage) {
      const res: any = await productInventory.getIntventory(
        id,
        "",
        currentPage
      );
      setPaginations(res.data);
    } else {
      const res: any = await productInventory.getIntventory(id, "", 1);
      setPaginations(res.data);
    }
  };
  const handleDeleteInventory = async (idInventory: any) => {
    await productInventory.delete(idInventory);
    const updatedInventories = inventories.filter(
      (item: any) => item.id !== idInventory
    );
    setInventories(updatedInventories);
    const newTotalPages = Math.ceil(updatedInventories.length / 3);
    const updatedCurrentPage = Math.min(currentPage, newTotalPages);

    const currentPageIndex = (updatedCurrentPage - 1) * 3;
    const updatedPaginations = updatedInventories.slice(
      currentPageIndex,
      currentPageIndex + 3
    );
    setPaginations(updatedPaginations);
    setSearchParams({ page: updatedCurrentPage.toString() });
  };

  const handleSearch = async () => {
    navigate({
      pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}`,
      search: createSearchParams({ q: search }).toString(),
    });
  };

  const handlePageChange = async (page: any) => {
    const startIndex = (page - 1) * 3;
    const endIndex = startIndex + 3;
    const updatedPaginations = inventories.slice(startIndex, endIndex);
    setPaginations(updatedPaginations);

    navigate({
      pathname: `${path.ADMIN}/${path.PRODUCT_MANAGEMENT}/view/${id}`,
      search: createSearchParams({ page }).toString(),
    });

    localStorage.setItem(local.PAGE, String(page) ?? "1");
  };

  // function handleSearchEnter(event: any) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     handleSearch();
  //   }
  // }

  useEffect(() => {
    getInventories();
    getPaginations();
    dispatch(getProductImages(id));
  }, [currentPage]);

  return (
    <div className="w-full pl-5 mt-6">
      <div>
        <h1 className="font-bold text-2xl mb-6">Quản lý sản phẩm</h1>
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
              // onKeyDown={handleSearchEnter}
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

        <input type="file" className="" onChange={handleImages} />
        <div>
          <table className="w-full border text-center">
            <thead>
              <tr>
                <th className="py-2 border">#</th>
                <th className="py-2 border">STT</th>
                <th className="py-2 border">Ảnh</th>
                <th className="py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {images?.map((image: any, index: number) => (
                <tr key={index}>
                  <td className="py-2 border">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="py-2 border">{index + 1}</td>
                  <td className="py-2 border">
                    <img
                      className="mx-auto h-20 w-20 object-contain"
                      src={`http://127.0.0.1:8000/uploads/${image?.path}`}
                      alt=""
                    />
                  </td>
                  <td className="py-2 border">
                    <div className="flex justify-center items-center space-x-2">
                      <span className="bg-blue-500 text-2xl p-1 cursor-pointer rounded">
                        <Link to={`${path.ADMIN}/edit/${image?.id}/`}>
                          <FaEdit className="text-white" />
                        </Link>
                      </span>
                      <span
                        title="Xóa"
                        className="bg-red-500 text-2xl p-1 cursor-pointer rounded"
                        onClick={() => dispatch(deleteProductImage(image?.id))}
                      >
                        <MdDelete className="text-white" />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Quản lý hàng tồn kho</h2>
              <button
                onClick={toggleModel}
                className="bg-green-500 flex items-center px-4 py-2 border rounded-md text-lg text-white font-bold"
              >
                <IoMdAdd className="mr-2" />
                <span className="">Thêm mới</span>
              </button>
            </div>

            <table className="w-full border text-center">
              <thead>
                <tr>
                  <th className="py-2 border">#</th>
                  <th className="py-2 border">STT</th>
                  <th className="py-2 border">ID</th>
                  <th className="py-2 border">Kích thước</th>
                  <th className="py-2 border">Màu sắc</th>
                  <th className="py-2 border">Tồn kho</th>
                  <th className="py-2 border">Số lượng bán</th>
                  <th className="py-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginations &&
                  paginations.map((pagination: any, index) => (
                    <tr key={index}>
                      <td className="py-2 border">
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td className="py-2 border">{index + 1}</td>
                      <td className="py-2 border">{pagination.id}</td>
                      <td className="py-2 border">{pagination.size}</td>
                      <td className="py-2 border">{pagination.color}</td>
                      <td className="py-2 border">{pagination.quantity_buy}</td>
                      <td className="py-2 border">
                        {pagination.quantity_sold}
                      </td>
                      <td className="py-2 border">
                        <div className="flex justify-center items-center space-x-2">
                          <span className="bg-blue-500 text-2xl p-1 cursor-pointer rounded">
                            <Link
                              to={`${path.ADMIN}/inventory/edit/${id}/${pagination.id}`}
                            >
                              <FaEdit className="text-white" />
                            </Link>
                          </span>
                          <span
                            title="Xóa"
                            className="bg-red-500 text-2xl p-1 cursor-pointer rounded"
                            onClick={() => handleDeleteInventory(pagination.id)}
                          >
                            <MdDelete className="text-white" />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <Pagination
              total={inventories.length}
              pageSize={3}
              current={currentPage}
              showSizeChanger
              showQuickJumper
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {isModelInventory && (
        <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto">
          <div className="relative mx-auto my-6 w-full max-w-lg">
            <div
              onClick={toggleModel}
              className="fixed inset-0 bg-black opacity-50 z-0"
            ></div>
            <div className="bg-white rounded-lg shadow-xl p-4 z-100 relative">
              <AddProductInventory
                onClose={toggleModel}
                updateInventories={getInventories}
                updatePaginations={getPaginations}
                productId={id}
              />
              <div
                onClick={toggleModel}
                className="absolute top-0 right-0 p-3 cursor-pointer "
              >
                <FaTimes />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
