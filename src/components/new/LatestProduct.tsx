"use client";
import React from "react";
import Center from "./Center";
import ProductBox from "./ProductBox";

// Define the product type
interface Product {
  _id: string;
  Name: string;
  Price: number;
  images: string[];
}

interface LatestProductProps {
  lateProduct: Product[];
}

const LatestProduct: React.FC<LatestProductProps> = ({ lateProduct }) => {
  return (
    <Center>
      <span className="font-semibold text-2xl text-center w-full text-black">Latest Product</span>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4">
        {lateProduct?.map((product) => {
        // Check if `product` is valid before rendering ProductBox
        if (product?._id) {
          return <ProductBox key={product._id} product={product} />;
        }
        return null; // Return null if `product` is invalid
      })}
      </div>
    </Center>
  );
};

export default LatestProduct;
