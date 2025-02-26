"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";

import ghostAnimation from "../assets/GhostAnimation.json";
import { removeFromCart, updateCartItemQuantity } from "../store/cartSlice";
import Lottie from "lottie-react";

const CartProduct = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (productId: number) => {
    console.log(productId);
    dispatch(removeFromCart(productId));
  };
  const handleCartItemQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-start text-center h-full lg:h-[80vh]">
        <Lottie
          animationData={ghostAnimation}
          className="opacity-80 w-1/3"
          loop={true}
        />
        <h1 className="text-xl font-semibold text-muted-foreground">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/assets"
          className="mt-4 px-4 py-2 bg-secondary-foreground text-primary-foreground rounded-lg hover:bg-secondary-foreground/80 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[80vh] overflow-y-scroll  space-y-6 flex-none lg:max-w-2xl xl:max-w-4xl">
      {cartItems.map((product, idx) => (
        <div
          key={idx}
          className="space-y-4  overflow-y-scroll md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 rounded-lg   bg-primary p-4 shadow-sm  md:p-6"
        >
          <Image
            className="h-20 w-20 shrink-0 md:order-1  object-cover  rounded-md"
            src={product.imgUrl}
            alt={product.title}
            height={100}
            width={100}
            quality={10}
            loading="lazy"
            sizes="(max-width: 768px) 100px, (max-width: 1200px) 200px, 100px" // Ensure the right size is loaded
          />

          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <button
                type="button"
                id="increment-button"
                onClick={() =>
                  handleCartItemQuantityChange(product.id, product.quantity - 1)
                }
                data-input-counter-increment="counter-input"
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border  bg-muted hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-muted text-primary p-1  "
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-10  text-center text-sm font-medium  ">
                {product.quantity}
              </span>

              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="counter-input"
                onClick={() =>
                  handleCartItemQuantityChange(product.id, product.quantity + 1)
                }
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border  bg-muted hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-muted text-primary p-1  "
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-semibold text-secondary">
                $ {product.price}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
            <h4>{product.title}</h4>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {product.desc}
            </p>

            <div className="flex pt-1 items-center gap-4">
              <span
                onClick={() => {
                  handleRemoveFromCart(product.id);
                }}
                className="inline-flex cursor-pointer items-center text-sm font-medium text-destructive"
              >
                <Trash2 className="mr-1 h-5 w-5" />
                Remove
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartProduct;
