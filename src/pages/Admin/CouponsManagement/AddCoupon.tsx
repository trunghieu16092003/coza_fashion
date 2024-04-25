import React, { useState, useEffect, memo } from "react";

import path from "../../../constants/path";
import { couponServices } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { addCoupon, getCoupon } from "../../../redux/coupon/asyncAction";

const AddCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setCoupon(value);
  };

  const handleAdd = () => {
    dispatch(addCoupon(coupon))
      .then(() => dispatch(getCoupon()))
      .then(() => navigate(`${path.ADMIN}/${path.COUPON_MANAGEMENT}`));
  };
  return (
    <div className="w-full pl-5 mt-6">
      <h1 className="font-bold text-2xl mb-6">Thêm loại voucher</h1>

      <div className="flex items-center">
        <input
          type="text"
          name=""
          id=""
          value={coupon}
          placeholder="Nhập loại voucher"
          className="text-base p-2 border outline-none border-gray-300 rounded-md"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white text-lg font-semibold p-2 ml-2 rounded-md"
          onClick={handleAdd}
        >
          Thêm loại voucher
        </button>
      </div>
    </div>
  );
};

export default memo(AddCoupon);
