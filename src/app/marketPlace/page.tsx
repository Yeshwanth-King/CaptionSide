// import Header from "@/components/Header";
// import HeroItem from "@/components/HeroItem";
// import LatestProduct from "@/components/LatestProduct";
// import connectDB from "@/lib/connectDB";
// import Products from "@/models/products";

import connectDB from "@/lib/connectDB";
import Products from "../models/products";
import Header from "@/components/new/Header";
import HeroItem from "@/components/new/HeroItem";
import LatestProduct from "@/components/new/LatestProduct";

// Define TypeScript interfaces for the product types
interface Product {
  _id: string;
  Name: string;
  description: string;
  Price: number;
  images: string[]; // Adjust the type based on your data
  category: string; // Adjust as per the actual type (e.g., string or object ID converted to string)
  properties: Record<string, any>; // Define specific properties if known
  updatedAt: string; // ISO string format
}

export default async function Home() {
  const HeroProductID = "66c6f85da567fc650f3de003";
  await connectDB();

  // Fetch the hero product and latest products
  const product = (await Products.findById(
    HeroProductID
  )) as unknown as Product | null;
  const LatestProducts = await Products.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });

  const allPro = (await Products.find()).map((product) => ({
    ...product.toObject(),
    _id: (product._id as unknown as string).toString(),
  }));

  // Convert MongoDB documents to the desired format
  const heroPro: Product | null = product
    ? {
        _id: product._id.toString(),
        Name: product.Name,
        description: product.description,
        Price: product.Price,
        images: product.images,
        category: product.category.toString(),
        properties: product.properties,
        updatedAt: product.updatedAt.toString(),
      }
    : null;

  const latePro: Product[] = LatestProducts.map((product) => ({
    _id: (product._id as unknown as string).toString(),
    Name: product.Name,
    description: product.description,
    Price: product.Price,
    images: product.images,
    category: (product.category as unknown as string).toString(),
    properties: product.properties,
    updatedAt: product.updatedAt
      ? new Date(product.updatedAt).toISOString()
      : "",
  }));

  return (
    <>
      <div className="bg-slate-200">
        <Header allPro={allPro} />
        {heroPro && <HeroItem product={heroPro} />}
        <LatestProduct lateProduct={latePro} />
      </div>
    </>
  );
}
