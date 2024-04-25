import React, { useState, useEffect, useRef, memo } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { couponServices } from "../../../services";
import path from "../../../constants/path";
import { useAppDispatch } from "../../../redux/hooks";
import { updateCoupon, getCoupon } from "../../../redux/coupon/asyncAction";

const EditCoupons = () => {
  const [coupon, setCoupon] = useState([]);
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getCouponById = async (id: string) => {
    try {
      const res: any = await couponServices.getCoupon(id);
      setCoupon(res.data);
    } catch (error) {
      console.error("Error getting category by ID:", error);
    }
  };

  const handleEditClick = (id: string) => {
    const inputValue = inputRef.current?.value || "";
    dispatch(updateCoupon({ id, data: { name: inputValue } }));
    dispatch(getCoupon());
    navigate(`${path.ADMIN}/${path.COUPON_MANAGEMENT}`);
  };

  useEffect(() => {
    if (id) {
      getCouponById(id);
    }
  }, [id]);

  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Chỉnh sửa danh mục</h1>

      {coupon &&
        coupon?.map((item: any, index: number) => (
          <div className="flex items-center">
            <input
              key={index}
              type="text"
              name=""
              id=""
              placeholder="Nhập từ khóa, ID"
              defaultValue={item.name}
              ref={inputRef}
              className="text-base p-2 border outline-none border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleEditClick(item.id)}
              className="bg-blue-600 text-white text-lg font-semibold p-2 ml-2 rounded-md"
            >
              Chỉnh sửa
            </button>
          </div>
        ))}
    </div>
  );
};

export default memo(EditCoupons);
