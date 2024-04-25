import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteCart, getCart } from "../../redux/cart/asyncAction";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
import local from "../../constants/local";
import { updateCart } from "../../redux/cart/asyncAction";

const Cart = () => {
  const { carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRedirectCheckout = () => {
    const cartItems = carts;
    localStorage.setItem(local.carts, JSON.stringify(cartItems));
    navigate(path.CHECKOUT);
  };

  const handleIncreaseQuantity = (index: number, id: any) => {
    const updatedCarts = [...carts];
    updatedCarts[index] = { ...updatedCarts[index] };
    updatedCarts[index].quantity += 1;
    dispatch(updateCart({ id: id, data: updatedCarts[index] }));
    dispatch(getCart());
  };

  const handleDecreaseQuantity = (index: any, id: any) => {
    const updatedCarts = [...carts];
    console.log(updatedCarts[index]);
    if (updatedCarts[index].quantity > 1) {
      updatedCarts[index] = { ...updatedCarts[index] };
      updatedCarts[index].quantity -= 1;
      dispatch(updateCart({ id: id, data: updatedCarts[index] }));
      dispatch(getCart());
    }
  };

  const handleDeleteCart = (id: string) => {
    dispatch(deleteCart(id));
    dispatch(getCart());
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mt-4 text-center font-bold mb-4">
        Giỏ hàng của bạn
      </h1>
      <div className="bg-white shadow-md rounded my-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-center p-3">STT</th>
              <th className="text-center p-3">Ảnh sản phẩm</th>
              <th className="text-center p-3">Tên sản phẩm</th>
              <th className="text-center p-3">Giá thành</th>
              <th className="text-center p-3">Số lượng</th>
              <th className="text-center p-3">Thành tiền</th>
              <th className="text-center p-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {carts?.map((cart: any, index) => (
              <tr key={index}>
                <td className="text-center p-3">{index + 1}</td>
                <td className="text-center p-3">
                  <img
                    src={`http://127.0.0.1:8000/uploads/${cart.path}`}
                    alt=""
                  />
                </td>
                <td className="text-center p-3">{cart.p_name}</td>
                <td className="text-center p-3">
                  {cart.p_price - (cart.p_price * cart.discount) / 100} VND
                </td>
                <td className="text-center p-3">
                  <span
                    className="inline-block cursor-pointer mr-2"
                    onClick={() => handleDecreaseQuantity(index, cart.id)}
                  >
                    -
                  </span>
                  {cart.quantity}
                  <span
                    className="inline-block cursor-pointer ml-2"
                    onClick={() => handleIncreaseQuantity(index, cart.id)}
                  >
                    +
                  </span>
                </td>
                <td className="text-center p-3">
                  {+(cart.p_price - (cart.p_price * cart.discount) / 100) *
                    +cart.quantity}
                  VND
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <span
                      onClick={() => handleDeleteCart(cart.id)}
                      className="inline-block cursor-pointer text-white text-xl bg-red-500 p-1 rounded-sm "
                    >
                      <MdDelete />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <button
          onClick={handleRedirectCheckout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
