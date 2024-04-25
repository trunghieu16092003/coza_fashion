import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getOrderDetails, updateOrder } from "../../../redux/order/asyncAction";
import { useParams } from "react-router-dom";

const OrderDetailsManagement = () => {
  const { code, status } = useParams();
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  const { orders } = useAppSelector((state) => state.order);

  const handleStatusChange = (e: any) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    const res: any = { order_status: newStatus };
    dispatch(updateOrder({ code: code, data: res }));
  };

  useEffect(() => {
    dispatch(getOrderDetails(code));
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Theo dõi đơn hàng</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Mã đơn hàng</th>
              <th className="px-4 py-2">Tên sản phẩm</th>
              <th className="px-4 py-2">Giá thành</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Tổng cộng</th>
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
                  {order.product_name}
                </td>

                <td className="border px-4 py-2 text-center">{order.price}</td>
                <td className="border px-4 py-2 text-center">
                  {order.quantity}
                </td>
                <td className="border px-4 py-2 text-center">
                  {order.total_all}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Trạng thái đơn hàng:
        </label>
        <select
          id="status"
          name="status"
          className="mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="1">Chờ xác nhận</option>
          <option value="2">Đã xác nhận</option>
          <option value="3">Đang giao hàng</option>
          <option value="4">Đã nhận hàng</option>
          <option value="0">Đã hủy</option>
        </select>
      </div>
    </div>
  );
};

export default OrderDetailsManagement;
