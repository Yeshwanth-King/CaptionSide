import Products from "@/app/models/products";
import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the request body
interface RequestBody {
  id: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { id }: RequestBody = await req.json(); // Type the request body
    // console.log(id)
    
    const product = await Products.findById(id); // Find a product by its ID
    console.log(product);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error); // Logging error
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
