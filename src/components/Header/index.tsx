import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.jpg";
import { categoryServices, userServices } from "../../services";
import local from "../../constants/local";
import path from "../../constants/path";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCart } from "../../redux/cart/asyncAction";
import { clearCart } from "../../redux/cart/cartSlice";
import { logout } from "../../redux/auth/authSlice";

interface CategoryItem {
  cat_name: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null);

  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.cart);
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const isAuth = localStorage.getItem(local.TOKEN);
  useEffect(() => {
    if (isLoggedIn) {
      const getProfile = async () => {
        const res: any = await userServices.getProfile();
        setUsername(res.name);
        setRole(res.role);
        localStorage.setItem(local.ROLE, res.role);
      };
      getProfile();
    }
    dispatch(getCart());
  }, [isLoggedIn]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 0);
  };

  const handleDropdownToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getCategories = async () => {
    try {
      const res: any = await categoryServices.getCategory();
      setCategories(res?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const getProfile = async () => {
  //   const res: any = await userServices.getProfile();
  //   setUsername(res.name);
  //   console.log(res);
  // };

  const handleLogout = async () => {
    try {
      await userServices.logout();
      localStorage.removeItem(local.TOKEN);
      setUsername("");
      dispatch(clearCart());
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <header
      className={`w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow fixed" : ""
      }`}
    >
      <div className="flex justify-between items-center mx-4 md:mx-[150px] py-4 md:py-[20px]">
        <div className="flex items-center ">
          <div>
            <img src={logo} alt="" />
          </div>
          <ul
            className={` md:inline-block ml-4 ${
              isMenuOpen ? "flex flex-col" : "hidden"
            }`}
          >
            <li className="list-none inline-block custom-list-item ml-2">
              <Link
                to=""
                className="text-[#6c7ae0] text-sm py-[5px] font-medium"
              >
                Trang chủ
              </Link>
            </li>
            <li className="relative list-none inline-block group ml-2">
              <Link
                to="#"
                className="text-sm py-[5px] font-medium hover:cursor-pointer hover:text-blue-500"
              >
                Sản phẩm
              </Link>
              {/* <ul className="none absolute mt-2 bg-white border border-gray-300 py-2 px-4 left-0 group:hover:block transition-all duration-300">
                {categories &&
                  categories.map((category: any, index: number) => (
                    <li key={index} className="text-gray-700">
                      {category.cat_name}
                    </li>
                  ))}
              </ul> */}
            </li>
            <li className="list-none inline-block custom-list-item ml-2">
              <Link to="" className=" text-sm py-[5px] font-medium">
                Blog
              </Link>
            </li>
            <li className="list-none inline-block custom-list-item ml-2">
              <Link to="" className=" text-sm py-[5px] font-medium">
                Giới thiệu
              </Link>
            </li>
            <li className="list-none inline-block custom-list-item ml-2">
              <Link to="" className=" text-sm py-[5px] font-medium">
                Liên hệ
              </Link>
            </li>
            <li className="list-none inline-block custom-list-item ml-2">
              <Link to="" className=" text-sm py-[5px] font-medium">
                Yêu thích
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="md:hidden pl-4 pr-2">
            <button onClick={handleDropdownToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className="flex md:pl-4">
            <div className="pl-4 pr-2 text-[26px]">
              <FaSearch />
            </div>
            <div className="pl-4 pr-2 text-[26px] relative">
              <Link to={path.CART}>
                <FaShoppingCart />
              </Link>
              <span className="absolute bg-[#6c7ae0] text-white text-center w-4 rounded-full text-sm bottom-4 left-9">
                {carts.length}
              </span>
            </div>
            <div className="pl-4 pr-2 relative group">
              {isAuth ? (
                <div>
                  <div className=" cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500">
                    <span className="text-xl font-bold">{username}</span>
                    <ul className="absolute w-48 bg-white top-[18px] text-black py-2 px-4 mt-2 border border-gray-300 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out invisible z-30 group-hover:visible">
                      {role === 1 ? (
                        <Link to={path.ADMIN} className="cursor-pointer">
                          Truy cập trang quản trị
                        </Link>
                      ) : (
                        ""
                      )}
                      <li className="cursor-pointer">Thông tin người dùng</li>
                      <li className="cursor-pointer" onClick={handleLogout}>
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[26px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-blue-500">
                    <FaUser />
                  </div>
                  <ul className="absolute w-40 bg-white top-[18px] text-black py-2 px-4 mt-2 border border-gray-300 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out invisible group-hover:visible">
                    <Link to={path.LOGIN} className="cursor-pointer">
                      Đăng nhập
                    </Link>
                    <li className="cursor-pointer">Đăng ký</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
