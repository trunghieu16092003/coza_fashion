import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

const initialState = {
  orders: [],
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getOrder.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(actions.getAllOrders.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(actions.getOrderDetails.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getOrderDetails.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(actions.addToOrder.fulfilled, (state: any, action) => {
        if (state.orders !== null) {
          state.orders = [...state.orders, action.payload];
        }
      })
      .addCase(actions.updateOrder.fulfilled, (state: any, action) => {
        const updatedOrder = action.payload;
        if (state.orders !== null) {
          state.orders = state.orders.map((order: any) =>
            order.code === updatedOrder.code ? updatedOrder : order
          );
        }
      })
      // .addCase(actions.deleteCoupon.fulfilled, (state, action) => {
      //   const deletedCouponId = action.payload;
      //   if (state.orders !== null) {
      //     state.orders = state.orders.filter(
      //       (coupon: any) => coupon.id !== deletedCouponId
      //     );
      //   }
      // })
      .addCase(actions.searchCoupons.pending, (state, action) => {
        // Handle pending state if needed
      })
      .addCase(actions.searchCoupons.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(actions.searchCoupons.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
