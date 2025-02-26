"use client";
import { RootState } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
const CartSummary = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const calculateTax = (totalPrice: number, taxRate: number) => {
    return totalPrice * taxRate;
  };
  const products = useSelector((state: RootState) => state.cart.items);

  const tax = calculateTax(totalAmount, 0.03);
  const calculateFinalPrice = (totalPrice: number, tax: number) => {
    return totalPrice + tax;
  };
  const finalPrice = calculateFinalPrice(totalAmount, tax);
  const makePayment = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const response = await axios.post("/api/create-checkout-session", {
      products,
    });
    console.log(response);

    const session = await response.data;

    const result =await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0  lg:w-full">
      <h2 className="text-xl font-semibold  min-w-full mx-auto  text-secondary sm:text-2xl">
              Cart Details
            </h2>
      <div className="space-y-4 rounded-lg bg-primary text-secondary p-3 sm:p-6">
        <form className="space-y-4">
          <div>
         
            <label className="mb-2 block p-2 text-center text-sm font-medium">
              {" "}
              Do you have a voucher or gift card?{" "}
            </label>
            <div className="flex justify-end gap-2">
              <input
                type="text"
                id="voucher"
                className="block w-full rounded-lg   bg-foreground/50 p-2.5 text-sm focus:border-primary-500 "
                placeholder=""
                required
              />
              <button
                type="submit"
                className="flex w-max items-center bg-foreground justify-center rounded-lg  p-2.5 text-sm font-medium text-secondary hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          </div>
        </form>

       
      </div>
      <div className="space-y-4 rounded-lg   p-4 shadow-sm bg-primary sm:p-6">
        <p className="text-xl font-semibold text-secondary">Order summary</p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-muted-foreground">
                Total price
              </dt>
              <dd className="text-base font-medium text-secondary">
                {totalAmount.toFixed(2)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-muted-foreground">
                Total Quantity
              </dt>
              <dd className="text-base font-medium text-secondary">
                {totalQuantity}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-muted-foreground">
                Tax
              </dt>
              <dd className="text-base font-medium text-destructive">
                {tax.toFixed(2)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-muted-foreground">Total</dt>
            <dd className="text-base font-bold text-secondary">
              {finalPrice.toFixed(2)}
            </dd>
          </dl>
        </div>
        <div>
         <Link 
          href="buy/checkout"
          className=" flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          link Proceed to Checkout
        </Link>
        <button
          onClick={makePayment}
          disabled={totalAmount === 0 || totalQuantity === 0}
          className="flex w-full items-center justify-center disabled:opacity-50 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Proceed to Checkout
        </button>

        <p className="text-sm w-full text-center font-normal text-muted-foreground">
            {'or'}
          </p>
        <div className="flex items-center justify-center  gap-2">
          
          <Link
            href="/assets/"
            title=""
            className="inline-flex items-center gap-1  text-sm font-medium text-muted-foreground underline hover:no-underline "
            >
            Continue Shopping
           
          </Link>
            </div>
        </div>
      </div>

      
    </div>
  );
};

export default CartSummary;
