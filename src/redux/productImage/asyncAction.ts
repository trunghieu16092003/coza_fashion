import { createAsyncThunk } from "@reduxjs/toolkit";
import { productImageServices } from "../../services";
import { toast } from "react-toastify";

export const getProductImages = createAsyncThunk(
  "productImage/current",
  async (id: string | undefined = undefined, { rejectWithValue }) => {
    try {
      const res: any = await productImageServices.getProductImages(id);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      throw error;
    }
  }
);

export const addProductImages = createAsyncThunk(
  "productImages/add",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await productImageServices.add(data);
      if (!res) return rejectWithValue(res);
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

// export const updateCoupon = createAsyncThunk(
//   "coupon/update",
//   async (payload: { id: string; data: any }, { rejectWithValue }) => {
//     try {
//       const { id, data } = payload;
//       const res = await couponServices.updateCoupon(id, data);
//       if (!res) return rejectWithValue(res);
//       return res.data;
//     } catch (error) {
//       console.error("Lỗi khi cập nhật coupon:", error);
//       throw error;
//     }
//   }
// );
export const deleteProductImage = createAsyncThunk(
  "coupon/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      confirm("Bạn chắc chắn muốn xóa chứ");
      const res = await productImageServices.delete(id);
      if (!res) return rejectWithValue(res);
      return id;
    } catch (error) {
      console.error("Lỗi khi xóa coupon:", error);
      throw error;
    }
  }
);
