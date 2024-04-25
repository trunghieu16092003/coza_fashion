import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

interface Coupon {
  id: number;
  name: string;
}

const initialState: { coupons: Coupon[] | null; error: string | null } = {
  coupons: null,
  error: null,
};
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCoupon.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getCoupon.fulfilled, (state, action) => {
        state.coupons = action.payload;
      })
      .addCase(actions.addCoupon.fulfilled, (state, action) => {
        if (state.coupons !== null) {
          state.coupons = [...state.coupons, action.payload];
        }
      })
      .addCase(actions.updateCoupon.fulfilled, (state, action) => {
        const updatedCoupon = action.payload;
        if (state.coupons !== null) {
          state.coupons = state.coupons.map((coupon: any) =>
            coupon.id === updatedCoupon.id ? updatedCoupon : coupon
          );
        }
      })
      .addCase(actions.deleteCoupon.fulfilled, (state, action) => {
        const deletedCouponId = action.payload;
        if (state.coupons !== null) {
          state.coupons = state.coupons.filter(
            (coupon: any) => coupon.id !== deletedCouponId
          );
        }
      })
      .addCase(actions.searchCoupons.pending, (state, action) => {
        // Handle pending state if needed
      })
      .addCase(actions.searchCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
      })
      .addCase(actions.searchCoupons.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export const {} = couponSlice.actions;
export default couponSlice.reducer;
