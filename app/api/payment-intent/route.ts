
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const amount = body.amount;
  console.log(amount)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      
    });
    return NextResponse.json(paymentIntent.client_secret, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
