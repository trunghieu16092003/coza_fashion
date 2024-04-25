import React, { useEffect, useState } from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import path from "../../../constants/path";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteCoupon,
  getCoupon,
  searchCoupons,
} from "../../../redux/coupon/asyncAction";

const CouponManagement = () => {
  const { coupons } = useAppSelector((state) => state.coupon);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSearch = async () => {
    navigate({
      pathname: `${path.ADMIN}/${path.COUPON_MANAGEMENT}`,
      search: createSearchParams({ q: search }).toString(),
    });
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
          await dispatch(searchCoupons(keyword))
            .unwrap()
            .catch((error: any) => {
              alert(error);
            });
        } else {
          dispatch(getCoupon());
        }
      } catch (error: any) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, [searchParams, dispatch]);

  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Quản lý loại voucher</h1>
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
            <th className="py-2 border">Loại voucher</th>
            <th className="py-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {coupons &&
            coupons.map((coupon: any, index: number) => (
              <tr key={index}>
                <td className="py-2 border">
                  <input type="checkbox" name="" id="" />
                </td>
                <td className="py-2 border">{index + 1}</td>
                <td className="py-2 border">{coupon?.id}</td>
                <td className="py-2 border">{coupon?.name}</td>
                <td className="py-2 border flex justify-center">
                  <span className="mr-2 bg-blue-500 text-2xl p-1 cursor-pointer rounded">
                    <Link to={`/admin/coupons/${coupon?.id}/edit`}>
                      <FaEdit className="text-white" />
                    </Link>
                  </span>
                  <span
                    title="Xóa"
                    className="bg-red-500 text-2xl p-1 cursor-pointer rounded"
                    onClick={() => dispatch(deleteCoupon(coupon.id))}
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

export default CouponManagement;
