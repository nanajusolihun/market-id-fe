import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsNavbar from "../components/products/ProductsNavbar";
import FooterProduct from "../components/FooterProduct";

const LayoutProducts = () => {
  return (
    <>
      <ProductsNavbar />
      <Container className="py-5">
        <Outlet />
      </Container>
      <FooterProduct /> 
    </>
  );
};

export default LayoutProducts;
