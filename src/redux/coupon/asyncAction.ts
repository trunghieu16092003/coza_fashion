import { createAsyncThunk } from "@reduxjs/toolkit";
import { couponServices } from "../../services";

export const getCoupon = createAsyncThunk(
  "coupon/current",
  async (id: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res: any = await couponServices.getCoupon(id);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const addCoupon = createAsyncThunk(
  "coupon/add",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = await couponServices.addCoupon(data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Error in addCoupon:", error);
      throw error;
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async (payload: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { id, data } = payload;
      const res = await couponServices.updateCoupon(id, data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật coupon:", error);
      throw error;
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await couponServices.deleteCoupon(id);
      if (!res) return rejectWithValue(res);
      return id;
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
