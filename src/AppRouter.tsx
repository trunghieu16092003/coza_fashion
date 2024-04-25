import { Routes, Route } from "react-router-dom";

import path from "./constants/path";

import AuthorizationUserLayout from "./components/layouts/AuthorizationUserLayout";
import AuthorizationAdminLayout from "./components/layouts/AuthorizationAdminLayout";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home/Home";

import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Checkout from "./pages/Checkout";

import ProductManagement from "./pages/Admin/ProductManagement";
import Category from "./pages/Category";
import CategoryManagement from "./pages/Admin/CategoryMangement";
import EditCategory from "./pages/Admin/CategoryMangement/EditCategory";
import AddCategory from "./pages/Admin/CategoryMangement/AddCategory";
import CouponManagement from "./pages/Admin/CouponsManagement";
import EditCoupon from "./pages/Admin/CouponsManagement/EditCoupon";
import AddCoupon from "./pages/Admin/CouponsManagement/AddCoupon";
import ProductView from "./pages/Admin/ProductManagement/ProductView";
import EditProductInventory from "./pages/Admin/ProductManagement/ProductInventory/EditProductInventory";
import AddProduct from "./pages/Admin/ProductManagement/AddProduct";
import EditProduct from "./pages/Admin/ProductManagement/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import LoginGoogle from "./pages/LoginGoogle";
import Order from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Thankyou from "./pages/Thankyou";
import OrderManagement from "./pages/Admin/OrderManagement";
import OrderDetailsManagement from "./pages/Admin/OrderDetailsManagement";
import Register from "./pages/Register/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={path.ADMIN} element={<AuthorizationAdminLayout />}>
        <Route path={path.PRODUCT_MANAGEMENT} element={<ProductManagement />} />
        <Route path={path.PRODUCT_ADD} element={<AddProduct />} />
        <Route path={path.PRODUCT_EDIT} element={<EditProduct />} />
        <Route path={path.PRODUCT_VIEW} element={<ProductView />} />
        <Route
          path={path.PRODUCT_INVENTORY}
          element={<EditProductInventory />}
        />
        <Route
          path={path.CATEGORY_MANAGEMENT}
          element={<CategoryManagement />}
        />
        <Route path={path.CATEGORY_ADD} element={<AddCategory />} />
        <Route path={path.CATEGORY_EDIT} element={<EditCategory />} />
        <Route path={path.COUPON_MANAGEMENT} element={<CouponManagement />} />
        <Route path={path.COUPON_EDIT} element={<EditCoupon />} />
        <Route path={path.COUPON_ADD} element={<AddCoupon />} />
        <Route path={path.COUPON_EDIT} element={<EditCoupon />} />
        <Route path={path.COUPON_ADD} element={<AddCoupon />} />
        <Route path={path.ORDER_MANAGEMENT} element={<OrderManagement />} />
        <Route
          path={path.ORDER_DETAILS_MANAGEMENT}
          element={<OrderDetailsManagement />}
        />
      </Route>
      <Route element={<AuthorizationUserLayout />}>
        <Route path={path.CART} element={<Cart />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.ORDER} element={<Order />} />
        <Route path={path.ORDER_DETAILS} element={<OrderDetails />} />
        <Route path={path.THANKYOU} element={<Thankyou />} />
      </Route>
      <Route element={<DefaultLayout />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.CATEGORY} element={<Category />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.LOGIN_GOOGLE} element={<LoginGoogle />} />
        <Route path={path.REGISTER} element={<Register />} />

        {/* <Route path={path.REGISTER} element={<Register />} /> */}
        <Route path={path.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={path.BLOG} element={<Blog />} />
        <Route path={path.BLOG_DETAIL} element={<BlogDetail />} />
        <Route path="/aboutUs" />
      </Route>
    </Routes>
  );
}
