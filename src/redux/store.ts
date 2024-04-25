// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";
import couponReducer from "./coupon/couponSlice";
import productImageReducer from "./productImage/productImageSlice";
import cartSlice from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    coupon: couponReducer,
    productImage: productImageReducer,
    cart: cartSlice,
    order: orderReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
