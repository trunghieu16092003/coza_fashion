import { createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "../../services";

export const getProduct = createAsyncThunk(
  "product/current",
  async (
    payload: { id?: string; page?: any; keyword?: string },
    { rejectWithValue }
  ) => {
    try {
      const { id, page, keyword } = payload;
      const res: any = await productServices.getProducts(id, page, keyword);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res: any = await productServices.add(data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (payload: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const { id, data } = payload;
      const res = await productServices.update(id, data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật coupon:", error);
      throw error;
    }
  }
);
