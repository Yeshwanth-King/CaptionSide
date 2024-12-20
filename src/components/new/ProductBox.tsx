"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartContexts } from "./CardContext";

// Define the type for product
interface Product {
  _id: string;
  Name: string;
  Price: number;
  images: string[];
}

// Define the type for the context value
interface CartContextType {
  addToCart: (id: string) => void;
}

// Define the props for the ProductBox component
interface ProductBoxProps {
  product: Product;
}

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const { addToCart } = useContext(CartContexts) as CartContextType;

  const AddProToCart = (id: string) => {
    addToCart(id);
  };

  return (
    <div>
      <div className="bg-white px-2 rounded-xl py-5 flex flex-col justify-between items-center gap-2 h-full">
        <Link href={"/marketPlace/products/" + product?._id} className="flex flex-col justify-center items-center gap-2">
          <Image
            src={product?.images[0]}
            alt={product?.Name}
            width={200}
            height={200}
          />
          <h1 className="text-lg font-semibold">{product?.Name}</h1>
        </Link>
        <div className="flex justify-between py-2 px-2 w-full items-center">
          <p className="text-xl font-semibold text-slate-600">
            ₹{product?.Price}
          </p>
          <button 
            onClick={() => { AddProToCart(product._id) }} 
            className="border-2 border-blue-500 font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 py-1 px-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBox;
