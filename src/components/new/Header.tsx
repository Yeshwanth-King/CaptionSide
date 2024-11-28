"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo1 from "@/assets/Resources/logo.svg";
import Image from "next/image";
import Center from "./Center";
import { CartContexts } from "./CardContext";

const StyleHeader = styled.header`
  background-color: #222;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 1rem;
  color: #ccc;
  overflow: hidden; // Hide overflowing content when menu is closed

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) =>
      isOpen ? "400px" : "0"}; // Control height animation
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")}; // Fade in/out effect
    transform: ${({ isOpen }) =>
      isOpen ? "translateY(0)" : "translateY(-20px)"}; // Slide down/up effect
    transition: max-height 0.6s ease, opacity 0.4s ease, transform 0.4s ease; // Smooth animation for max-height, opacity, and transform
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    width: 100%;
    text-align: left;
  }
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.4s ease, opacity 0.4s ease;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: inline-block;
    transition: transform 0.4s ease;
  }

  &.open span {
    transform: rotate(180deg); // Rotate icon when open
  }
`;

interface CartContextType {
  cartProducts: { length: number };
}
interface Product {
  _id: string;
  Name: string;
  description: string;
  images: string[];
}
interface HeaderProps {
  allPro: Product[];
}

const Header: React.FC<HeaderProps> = ({ allPro }) => {
  const { cartProducts } = useContext(CartContexts) as CartContextType; // Type the context value
  const [isOpen, setIsOpen] = useState<boolean>(false); // Define state type

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <ToggleButton onClick={toggleMenu} className={isOpen ? "open" : ""}>
            <span>{isOpen ? "✖" : "☰"}</span>
          </ToggleButton>
          <Logo href={"http://localhost:3000/"}>
            <Image src={Logo1} width={200} height={100} alt="Logo" />
          </Logo>
          <Nav isOpen={isOpen}>
            <NavLink href={"/marketPlace"}>Home</NavLink>
            <NavLink href={"/marketPlace/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/marketPlace/cart"}>
              Cart ({cartProducts?.length})
            </NavLink>
          </Nav>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
};

export default Header;
