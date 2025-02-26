import { RootState } from "@/store";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import {  useState } from "react";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const calculateTax = (totalPrice: number, taxRate: number) => {
    return totalPrice * taxRate;
  };

  const tax = calculateTax(totalAmount, 0.07);
  const calculateFinalPrice = (totalPrice: number, tax: number) =>  {
    return totalPrice + tax;
  };
  const finalPrice = calculateFinalPrice(totalAmount, tax).toFixed(2);
  console.log(typeof Number(finalPrice),finalPrice);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error?.message ?? "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const clientSecret = await fetch("/api/payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount:4400 }),
    }).then((res) => res.json());

    const result = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: "buy",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-32">
      <PaymentElement />
      <button
        type="submit"
        className="bg-green-300 w-full mt-4 "
        disabled={!stripe || loading}
      >
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
