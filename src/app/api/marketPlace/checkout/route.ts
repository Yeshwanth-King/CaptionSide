import Order from "@/app/models/Order";
import Products from "@/app/models/products";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Define types for the request body
interface CartProduct {
  _id: string;
  Name: string;
  Price: number;
}

interface RequestBody {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  cartProducts: string[];
}

// Define types for line items
interface LineItem {
  quantity: number;
  price_data: {
    currency: string;
    product_data: { name: string };
    unit_amount: number;
  };
}

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SK as string, { apiVersion: "2024-11-20.acacia" });

  console.log("POST request");

  const data = (await req.json()) as RequestBody;
  const { name, email, address, city, state, pincode, cartProducts } = data;

  const productIDs = cartProducts;
  const uniqueIDs = [...new Set(productIDs)];
  console.log(uniqueIDs)

  await connectDB();

  const productInfo = await Products.find({ _id: { $in: uniqueIDs } }) as CartProduct[];

  const line_items: LineItem[] = [];

  for (const productID of uniqueIDs) {
    const product = productInfo.find((p) => p._id.toString() === productID);

    if (!product) continue;
    
    const quantity = cartProducts.filter((item) => item === productID).length;
    
    line_items.push({
        quantity,
        price_data: {
            currency: "INR",
            product_data: { name: product.Name },
            unit_amount: product.Price * 100, // Stripe requires amounts in cents/paise
        },
    });
    console.log(line_items)
  }


  const orderDoc = await Order.create({
    line_items:line_items,
    name,
    email,
    address,
    city,
    state,
    pincode,
    paid: true,
  }) as { _id: string };

 try {
  const session = await stripe.checkout.sessions.create({
    line_items:line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/marketPlace/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/marketPlace/cart?cancel=1`,
    metadata: { order_id: orderDoc._id.toString() },
  });
  return NextResponse.json({ url: session.url });
} catch (error) {
  console.error("Stripe Session Error:", error);
  return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
}
}
