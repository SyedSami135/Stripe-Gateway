import products from "@/assets/data/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DigitalProduct {
  id: number;
  title: string;
  desc: string;
  imgUrl: string;
  price: number;
  rating: number;
}

interface DigitalProductsState {
  products: DigitalProduct[];
}

const initialState: DigitalProductsState = {
  products: products,
};

const productSlice = createSlice({
  name: "digitalProducts",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<DigitalProduct[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<DigitalProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
