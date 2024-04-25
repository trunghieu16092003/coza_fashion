import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

interface IProductImage {
  id: number;
  name: string;
}

const initialState: { images: IProductImage[] | null; error: string | null } = {
  images: null,
  error: null,
};
const imageSlice = createSlice({
  name: "productImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getProductImages.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getProductImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(actions.addProductImages.fulfilled, (state, action) => {
        state.images = state.images
          ? [...state.images, action.payload]
          : [action.payload];
      })
      // .addCase(actions.updateCoupon.fulfilled, (state, action) => {
      //   const updatedCoupon = action.payload;
      //   if (state.coupons !== null) {
      //     state.coupons = state.coupons.map((coupon: any) =>
      //       coupon.id === updatedCoupon.id ? updatedCoupon : coupon
      //     );
      //   }
      // })
      .addCase(actions.deleteProductImage.fulfilled, (state, action) => {
        const deletedCouponId = action.payload;
        if (state.images !== null) {
          state.images = state.images.filter(
            (coupon: any) => coupon.id !== deletedCouponId
          );
        }
      });
    // .addCase(actions.searchCoupons.pending, (state, action) => {
    //   // Handle pending state if needed
    // })
    // .addCase(actions.searchCoupons.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.coupons = action.payload;
    // })
    // .addCase(actions.searchCoupons.rejected, (state, action: any) => {
    //   state.error = action.payload;
    // });
  },
});

export const {} = imageSlice.actions;
export default imageSlice.reducer;
