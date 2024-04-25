// Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-9 px-12">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl mb-4">Danh mục</h2>
          <ul className="list-none">
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link>Nữ</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link>Nam</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link>Đồng hồ</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link>Giày</Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl mb-4">Trợ giúp</h2>
          <ul className="list-none">
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link to="/">Trợ giúp dịch vụ khách hàng</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link to="/">Biểu đồ kích cỡ</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link to="/">Giao hàng</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link to="/">Trả hàng và hoàn tiền</Link>
            </li>
            <li className="mb-2 transition-transform transform hover:-translate-x-1">
              <Link to="/">Khuyến mãi</Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl mb-4">Theo dõi chúng tôi</h2>
          <ul>{/* Thêm các liên kết mạng xã hội nếu có */}</ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4">
          <h2 className="text-xl mb-4">Đăng ký ngay</h2>
          <div className="flex">
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              className="p-2 mr-2 w-2/3"
            />
            <button className="bg-blue-500 text-white p-2 w-1/3">
              Subcribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
