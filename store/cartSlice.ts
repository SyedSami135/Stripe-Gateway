import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DigitalProduct } from "./productSlice";
import { loadCartState } from "@/utils/cartState";

interface quantity {
  quantity: number;
}
interface CartItem extends DigitalProduct, quantity {}
interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = loadCartState();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = state.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item: CartItem) => item.id === action.payload
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item: CartItem) => item.id !== action.payload
        );
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }
      if (item && action.payload.quantity === 0) {
        state.items = state.items.filter(
          (item: CartItem) => item.id !== action.payload.id
        );
      }

      state.totalQuantity = state.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
