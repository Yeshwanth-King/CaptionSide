// import AllProducts from "@/components/AllProducts";
// import Header from "@/components/Header";
import Products from "@/app/models/products";
import AllProducts from "@/components/new/AllProducts";
import Header from "@/components/new/Header";
import connectDB from "@/lib/connectDB";
// import Products, { ProductDocument } from "@/models/products"; // Assuming the model is typed
import React from "react";

// Define the type for the allProducts data
interface AllProductsData {
    _id: string;
    Name: string;
    description: string;
    Price: number;
    images: string[];
    category: string;
    properties: Record<string, any>;
    updatedAt: string;
}

const page = async () => {
    await connectDB();

    // Find products from MongoDB, typed as ProductDocument[] 
    const products = await Products.find({}, null, { sort: { _id: -1 } });

    // Map the products to the shape required for your component
    const allProducts: AllProductsData[] = products.map((product: any) => ({
        _id: product._id.toString(),
        Name: product.Name,
        description: product.description,
        Price: product.Price,
        images: product.images,
        category: product.category.toString(),
        properties: product.properties,
        updatedAt: product.updatedAt.toISOString(),
    }));

    return (
        <div className="min-h-screen bg-slate-200 text-black">
            <Header />
            <div className="max-w-[1200px] mx-auto p-5">
                <h1 className="text-3xl font-bold">All Products</h1>
                <AllProducts products={allProducts} />
            </div>
        </div>
    );
};

export default page;
