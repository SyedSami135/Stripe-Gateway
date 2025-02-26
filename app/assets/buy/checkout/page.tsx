"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function App() {
  const options = {
    mode: "payment",
    currency: "usd",
    amount: 1000,
   

    // clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
      <div className=" bg-white w-screen flex   h-screen">

    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
      </div>
  );
}
