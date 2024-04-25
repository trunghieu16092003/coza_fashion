import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartServices } from "../../services";

export const getCart = createAsyncThunk(
  "cart/get",
  async (id: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res: any = await cartServices.getCart();
      if (!res) return rejectWithValue(res);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await cartServices.addToCart(data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Error in addCoupon:", error);
      throw error;
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async (payload: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { id, data } = payload;
      const res = await cartServices.updateCart(id, data);
      if (!res) return rejectWithValue(res);
      return res;
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      throw error;
    }
  }
);
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await cartServices.deleteCart(id);
      if (!res) return rejectWithValue(res);
      return res;
    } catch (error) {
      console.error("Lỗi khi xóa coupon:", error);
      throw error;
    }
  }
);

export const searchCoupons = createAsyncThunk(
  "coupon/search",
  async (query: string, { rejectWithValue }) => {
    try {
      const res: any = await couponServices.searchCoupon(query);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
