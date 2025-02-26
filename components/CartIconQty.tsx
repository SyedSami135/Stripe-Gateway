"use client";
import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
const CartIconQty = () => {
    const totalQty= useSelector(
    (state: RootState) => state.cart.totalQuantity)
  return (
    <div className="flex flex-col  justify-start items-center">
      <ShoppingBagIcon size={32} />
      {totalQty>0&&
      <p
        className="-mt-3 -ml-4 w-8 h-8 flex items-center bg-secondary-foreground/70 
        justify-center rounded-full text-xs text-center text-primary-foreground "
      >
        {totalQty}
      </p>}
    </div>
  );
};

export default CartIconQty;
