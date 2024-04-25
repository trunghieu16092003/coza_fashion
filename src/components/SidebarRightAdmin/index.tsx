import React, { useState } from "react";

import { HiMiniUserGroup } from "react-icons/hi2";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdFormatSize,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiProductHuntFill } from "react-icons/ri";
import { IoIosColorFilter } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "../../constants/path";

const SidebarRightAdmin = () => {
  const [activeMenu, setActiveMenu] = useState<any>({
    users: false,
    categories: false,
    products: false,
    sizes: false,
    colors: false,
    coupons: false,
    orders: false,
    statisticals: false,
  });

  const toggleActive = (menu: string) => {
    setActiveMenu((prevActiveMenu: any) => ({
      ...Object.fromEntries(
        Object.keys(prevActiveMenu).map((key: any) => [
          key,
          key === menu ? !prevActiveMenu[key] : false,
        ])
      ),
    }));
  };

  return (
    <section className="basis-1/6 h-screen bg-slate-700 text-white py-2">
      <div className="justify-center items-center flex mb-2">
        {/* Your logo code */}
      </div>
      <div className="">
        <span
          className="flex justify-around items-center cursor-pointer py-3"
          onClick={() => toggleActive("users")}
        >
          <span>
            <HiMiniUserGroup />
          </span>
          <span>Quản lý người dùng</span>
          <span>
            {activeMenu.users ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </span>
        </span>
        {activeMenu.users && (
          <ul className="ml-7">
            <li className="py-2">Danh sách người dùng</li>
            {/* <li className="py-2"></li> */}
          </ul>
        )}
      </div>
      <div className="">
        <span
          className="flex justify-around items-center cursor-pointer py-3"
          onClick={() => toggleActive("categories")}
        >
          <span>
            <BiSolidCategoryAlt />
          </span>
          <span>Quản lý danh mục</span>
          <span>
            {activeMenu.categories ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </span>
        </span>
        {activeMenu.categories && (
          <ul className="ml-7">
            <li className="py-2">
              <Link className="w-full block" to="/admin/list-category">
                Danh sách danh mục
              </Link>
            </li>
            <li className="py-2">
              <Link className="w-full block" to="/admin/list-category/add">
                Thêm danh mục
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="">
        <span
          className="flex justify-around items-center cursor-pointer py-3"
          onClick={() => toggleActive("products")}
        >
          <span>
            <RiProductHuntFill />
          </span>
          <span>Quản lý sản phẩm</span>
          <span>
            {activeMenu.products ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </span>
        </span>
        {activeMenu.products && (
          <ul className="ml-7">
            <Link className="w-full block" to={`${path.PRODUCT_MANAGEMENT}`}>
              Danh sách sản phẩm
            </Link>
            <li className="py-2">Thêm sản phẩm</li>
          </ul>
        )}
      </div>
      <div className="">
        <span
          className="flex justify-around items-center cursor-pointer py-3"
          onClick={() => toggleActive("sizes")}
        >
          <span>
            <MdFormatSize />
          </span>
          <span>Quản lý kích thước</span>
          <span>
            {activeMenu.sizes ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </span>
        </span>
        {activeMenu.sizes && (
          <ul className="ml-7">
            <li className="py-2">Danh sách kích thước</li>
            <li className="py-2">Thêm kích thước</li>
          </ul>
        )}
      </div>
      <div className="">
        <span
          className="flex justify-around items-center cursor-pointer py-3"
          onClick={() => toggleActive("coupons")}
        >
          <span>
            <HiMiniUserGroup />
          </span>
          <span>Quản lý voucher</span>
          <span>
            {activeMenu.coupons ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </span>
        </span>
        {activeMenu.coupons && (
          <ul className="ml-7">
            <li className="py-2">
              <Link className="w-full block" to={`${path.COUPON_MANAGEMENT}`}>
                Danh sách loại voucher
              </Link>
            </li>
            <li className="py-2">
              <Link className="w-full block" to={`${path.COUPON_ADD}`}>
                Thêm loại voucher
              </Link>
            </li>
          </ul>
        )}

        <div className="">
          <span
            className="flex justify-around items-center cursor-pointer py-3"
            onClick={() => toggleActive("colors")}
          >
            <span>
              <IoIosColorFilter />
            </span>
            <span>Quản lý màu sắc</span>
            <span>
              {activeMenu.colors ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </span>
          </span>
          {activeMenu.colors && (
            <ul className="ml-7">
              <li className="py-2">Danh sách màu sắc</li>
              <li className="py-2">Thêm màu sắc</li>
            </ul>
          )}
        </div>
        <div className="">
          <span
            className="flex justify-around items-center cursor-pointer py-3"
            onClick={() => toggleActive("orders")}
          >
            <span>
              <FaShoppingCart />
            </span>
            <span>Quản lý đơn hàng</span>
            <span>
              {activeMenu.orders ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </span>
          </span>
          {activeMenu.orders && (
            <ul className="ml-7">
              <Link to={path.ORDER_MANAGEMENT} className="py-2">
                Danh sách đơn hàng
              </Link>
            </ul>
          )}
        </div>
        <div className="">
          <span
            className="flex justify-around items-center cursor-pointer py-3"
            onClick={() => toggleActive("statisticals")}
          >
            <span>
              <HiMiniUserGroup />
            </span>
            <span>Quản lý thống kê</span>
            <span>
              {activeMenu.statisticals ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowRight />
              )}
            </span>
          </span>
          {activeMenu.statisticals && (
            <ul className="ml-7">
              <li className="py-2">Danh sách thống kê</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default SidebarRightAdmin;
