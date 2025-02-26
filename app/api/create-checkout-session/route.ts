import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const products = body.products;
  console.log(products)

  const lineItems = products.map((product: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title,
        images: [product.imgUrl],
        description: product.desc,
      
      },
      unit_amount:Math.round(product.price) * 100,
    },
    quantity: product.quantity,
  }));
  console.log(lineItems[0].price_data)
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/assets/',
    });
 

    return NextResponse.json({ id: session.id, status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
