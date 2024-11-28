"use client";
import { CartContexts } from "@/components/new/CardContext";
import Center from "@/components/new/Center";
import Header from "@/components/new/Header";
import ProductImages from "@/components/new/ProductImages";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

// Define types for product data
interface Product { 
  _id: string;
  Name: string;
  Price: string;
  category: string;
  description: string;
  images: string[];
}

// Define the type for the component state
interface ProductData {
  _id: string;
  Name: string;
  Price: string;
  category: string;
  description: string;
  images: string[];
}

const Page: React.FC = () => {
  const [data, setData] = useState<ProductData>({
    _id: "",
    Name: "",
    Price: "",
    category: "",
    description: "",
    images: [],
  });
  const params = useParams();
  const cartContext = useContext(CartContexts);
  const addToCart = cartContext?.addToCart;

  useEffect(() => {
    const fetchData = async () => {
      const data = { id: params.id };
      const response = await axios.post("/api/marketPlace/findProducts", data);
      console.log(response.data);
      setData(response.data.product);
    };
    fetchData();
  }, [params.id]);

  // Styled component for layout
  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 40px;
    margin-top: 30px;
    @media (max-width: 768px) {
      grid-template-columns: 1fr; // Single column for smaller screens
      gap: 30px; // Adjust gap for smaller screen sizes
    }
  `;

  const AddProToCart = (id: string) => {
    if(addToCart){
      addToCart(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 text-black">
      <Header />
      <Center>
        <Wrapper>
          <div className="bg-white flex flex-col gap-5 justify-center items-center p-10 rounded-xl">
            <ProductImages images={data.images} />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-extrabold">{data.Name}</h1>
            <p className="text-gray-500">{data.description}</p>
            <div className="flex gap-10 items-center p-2">
              <p className="text-3xl font-bold">₹{data.Price}</p>
              <button
                onClick={() => {
                  AddProToCart(data._id);
                }}
                className="border-2 border-blue-500 font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 py-1 px-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Wrapper>
      </Center>
    </div>
  );
};

export default Page;
