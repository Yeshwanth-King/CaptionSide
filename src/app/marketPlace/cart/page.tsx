"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { CartContexts } from "@/components/new/CardContext";
import Header from "@/components/new/Header";
import Center from "@/components/new/Center";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CartPage = () => {
  const {
    cartProducts = [],
    addToCart,
    removeFromCart,
    clearCart,
  } = useContext(CartContexts) || {};
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<
    { _id: string; Price: number; Name: string; images?: string[] }[]
  >([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const isSuccess =
    typeof window !== "undefined" && window.location.href.includes("success");

  const total = (cartProducts || []).reduce((acc, productId) => {
    const product = products.find((p) => p._id === productId);
    return acc + (product?.Price || 0);
  }, 0);

  interface Product {
    _id: string;
    Price: number;
    Name: string;
    images?: string[];
  }

  interface CartContextType {
    cartProducts: string[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  }

  const handleAddProduct = (id: string) => {
    if (addToCart) {
      addToCart(id);
    }
  };

  const handleRemoveProduct = (id: string) => {
    if (removeFromCart) {
      removeFromCart(id);
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if ((cartProducts ?? []).length === 0) return;

      try {
        const response = await axios.post(
          "/api/marketPlace/cart",
          { ids: cartProducts },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    fetchCartProducts();
  }, [cartProducts]);

  useEffect(() => {
    if (isSuccess) if (clearCart) clearCart();
  }, [isSuccess]);

  const goToPayment = async () => {
    setLoader(true);
    try {
      const response = await axios.post("/api/marketPlace/checkout", {
        name,
        email,
        address,
        city,
        state,
        pincode,
        cartProducts,
      });

      if (response.data.url) {
        setLoader(false);
        window.localStorage.removeItem("cart");
        window.location.href = response.data.url; // Redirect to payment URL
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoader(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-200 text-black">
        <Header />
        <Center>
          <div className="bg-white px-4 py-6 rounded-xl flex flex-col items-center gap-4">
            <h1 className="font-bold text-4xl text-center">
              Thanks for Ordering!
            </h1>
            <p className="text-gray-500 text-center">
              We will email you when your order is ready for delivery.
            </p>
            <Link
              className="bg-black text-white px-4 py-2 rounded-lg mt-4"
              href="/marketPlace"
            >
              Continue Shopping
            </Link>
          </div>
        </Center>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 text-black">
      <Header />
      <Center>
        <ColumnWrapper>
          {/* Cart Items */}
          <div className="bg-white px-4 py-6 rounded-xl">
            {cartProducts.length === 0 ? (
              <div>Your Cart is empty</div>
            ) : (
              <>
                <h2 className="font-bold text-2xl mb-4">Cart</h2>
                {products.map((product) => (
                  <div key={product._id} className="flex gap-4 mb-4">
                    <Image
                      src={product.images?.[0] || "/placeholder.png"}
                      width={100}
                      height={100}
                      alt={product.Name}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.Name}</h3>
                      <p className="text-gray-500">₹{product.Price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="border px-2 py-1 rounded"
                          onClick={() => handleRemoveProduct(product._id)}
                        >
                          -
                        </button>
                        <span>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </span>
                        <button
                          className="border px-2 py-1 rounded"
                          onClick={() => handleAddProduct(product._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 font-bold text-lg">Total: ₹{total}</div>
              </>
            )}
          </div>

          {/* Order Information */}
          {cartProducts.length > 0 && (
            <div className="bg-white px-4 py-6 rounded-xl">
              <h2 className="font-bold text-2xl mb-4">Order Information</h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded-lg"
              />
              <button
                onClick={goToPayment}
                disabled={loader}
                className={`w-full px-3 py-2 text-white rounded-lg ${
                  loader ? "bg-gray-500 cursor-not-allowed" : "bg-black"
                }`}
              >
                {loader ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          )}
        </ColumnWrapper>
      </Center>
    </div>
  );
};

export default CartPage;
