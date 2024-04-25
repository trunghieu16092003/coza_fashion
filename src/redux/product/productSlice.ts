import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
import { IProduct } from "../../hooks/product/useProductForm";

const initialState: {
  products: IProduct[] | null;
  error: string | null;
  isLoading: boolean;
} = {
  products: null,
  error: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actions.getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      .addCase(actions.addProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actions.addProduct.fulfilled, (state, action) => {
        state.products = state.products
          ? [...state.products, action.payload]
          : [action.payload];
      })

      // .addCase(actions.addCoupon.fulfilled, (state, action) => {
      //   if (state.products !== null) {
      //     state.products = [...state.products, action.payload];
      //   }
      // })
      .addCase(actions.updateProduct.fulfilled, (state, action) => {
        const updateProduct = action.payload;
        if (state.products !== null) {
          state.products = state.products.map((product: any) =>
            product.id === updateProduct.id ? updateProduct : product
          );
        }
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
