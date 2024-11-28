import Products from "@/app/models/products";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

interface RequestBody {
  ids: string[]; // Define the expected shape of the request body
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // Parse and validate the request body
    const body: RequestBody = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
      return NextResponse.json(
        { message: "Invalid request body: 'ids' must be an array of strings." },
        { status: 400 }
      );
    }

    // Fetch the products from the database
    const products = await Products.find({ _id: { $in: ids } });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error("Error adding product:", error); // Logging error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
