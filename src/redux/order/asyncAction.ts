import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "../../services";

export const getOrder = createAsyncThunk(
  "order/get",
  async (id: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res: any = await orderServices.getOrder();
      if (!res) return rejectWithValue(res);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAll",
  async (id: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res: any = await orderServices.getAllOrder();
      if (!res) return rejectWithValue(res);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (code: string, { rejectWithValue }) => {
    try {
      const res: any = await orderServices.getOrderDetails(code);
      if (!res) return rejectWithValue(res);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const addToOrder = createAsyncThunk(
  "order/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await orderServices.addOrder(data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Error in add order:", error);
      throw error;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/update",
  async (payload: { code: any; data: any }, { rejectWithValue }) => {
    try {
      const { code, data } = payload;
      const res = await orderServices.updateOrder(data, code);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật coupon:", error);
      throw error;
    }
  }
);
// export const deleteCoupon = createAsyncThunk(
//   "coupon/delete",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const res = await couponServices.deleteCoupon(id);
//       if (!res) return rejectWithValue(res);
//       return id;
//     } catch (error) {
//       console.error("Lỗi khi xóa coupon:", error);
//       throw error;
//     }
//   }
// );

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
