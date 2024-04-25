import RestClient from "./RestClient";
import ProductServices from "./product";
import UserServices from "./auth";
import CartServices from "./cart";
import OrderServices from "./order";
import CategoryServices from "./category";
import ColorServices from "./color";
import SizeServices from "./size";
import CouponServices from "./coupon";
import ProductInventoryServices from "./productInventory";
import ProductImageServices from "./productImages";
import CheckoutServices from "./checkout";
import WishlistServices from "./wishlist";

const restClient = new RestClient();

export const categoryServices = new CategoryServices(restClient);
export const productServices = new ProductServices(restClient);
export const productInventory = new ProductInventoryServices(restClient);
export const colorServices = new ColorServices(restClient);
export const sizeServices = new SizeServices(restClient);
export const userServices = new UserServices(restClient);
export const cartServices = new CartServices(restClient);
export const orderServices = new OrderServices(restClient);
export const couponServices = new CouponServices(restClient);
export const productImageServices = new ProductImageServices(restClient);
export const checkoutServices = new CheckoutServices(restClient);
export const wishlistServices = new WishlistServices(restClient);
