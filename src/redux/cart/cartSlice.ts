import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";

const initialState = {
  carts: [],
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCart.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(actions.getCart.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(actions.addToCart.fulfilled, (state: any, action: any) => {
        const existingCartItemIndex = state.carts.findIndex(
          (item: any) => item.pid === action.payload.pid
        );
        if (existingCartItemIndex !== -1) {
          state.carts[existingCartItemIndex].quantity +=
            action.payload.quantity;
        } else {
          state.carts.push(action.payload);
        }
      })

      .addCase(actions.updateCart.fulfilled, (state: any, action) => {
        const updatedCart = action.payload;
        if (state.carts !== null) {
          state.carts = state.carts.map((carts: any) =>
            carts.id === updatedCart.id ? updatedCart : carts
          );
        }
      })
      .addCase(actions.deleteCart.fulfilled, (state, action) => {
        const deletedCartId = action.payload;
        if (state.carts !== null) {
          state.carts = state.carts.filter(
            (cart: any) => cart.id !== deletedCartId
          );
        }
      })
      .addCase(actions.searchCoupons.pending, (state, action) => {
        // Handle pending state if needed
      })
      .addCase(actions.searchCoupons.fulfilled, (state, action) => {
        state.carts = action.payload;
      })
      .addCase(actions.searchCoupons.rejected, (state, action: any) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
