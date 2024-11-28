"use client"
import React from 'react';
import ProductBox from './ProductBox';

// Define the type for individual product objects
interface Product {
  _id: string;
  Name: string;
  description: string;
  Price: number;
  images: string[];
  category: string;
  properties: Record<string, any>;
  updatedAt: string;
}

// Define the props for the AllProducts component
interface AllProductsProps {
  products: Product[]; // products is an array of Product objects
}

const AllProducts: React.FC<AllProductsProps> = ({ products }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4">
        {products?.map((pro) => (
          <ProductBox key={pro._id} product={pro} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
