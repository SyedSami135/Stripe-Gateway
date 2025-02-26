// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice'; 
import { saveCartState } from '@/utils/cartState';
export const store = configureStore({
  reducer: {
    digitalProducts: productsReducer,  // Digital products list
    cart: cartReducer,        
  },
  
});
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
