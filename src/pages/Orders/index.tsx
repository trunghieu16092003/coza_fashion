import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getOrder } from "../../redux/order/asyncAction";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  const getOrderStatusLabel = (status: any) => {
    switch (+status) {
      case 1:
        return "Chờ xử lý";
      case 2:
        return "Đã xác nhận";
      case 3:
        return "Đang giao";
      case 4:
        return "Đã nhận hàng";
      case 0:
        return "Đã hủy";
      default:
        return "";
    }
  };

  const getStatusClass = (status: any) => {
    switch (+status) {
      case 1:
        return "text-white bg-blue-600";
      case 2:
        return "text-white bg-purple-200";
      case 3:
        return "text-white bg-yellow-200";
      case 4:
        return "text-white bg-green-200";
      case 0:
        return "text-white bg-red-200";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Mã đơn hàng</th>
              <th className="px-4 py-2">Tên người nhận</th>
              <th className="px-4 py-2">Địa chỉ</th>
              <th className="px-4 py-2">Số điện thoại</th>
              <th className="px-4 py-2">Tổng thanh toán</th>
              <th className="px-4 py-2">Trạng thái giao hàng</th>
              <th className="px-4 py-2">Thời gian đặt hàng</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {order.cart_code}
                </td>
                <td className="border px-4 py-2 text-center">
                  {order.recipient_name}
                </td>

                <td className="border px-4 py-2 text-center">
                  {order.address}, {order.ward}, {order.district},{" "}
                  {order.province}
                </td>
                <td className="border px-4 py-2 text-center">{order.phone}</td>
                <td className="border px-4 py-2 text-center">
                  {order.total_all}
                </td>
                <td className={`border px-4 py-2 text-center`}>
                  <button className={`${getStatusClass(order.order_status)}`}>
                    {getOrderStatusLabel(order.order_status)}
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  {order.created_at}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/order_details/${order.cart_code}`}>
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
