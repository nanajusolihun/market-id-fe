import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsNavbar from "../components/products/ProductsNavbar";

const LayoutProducts = () => {
  return (
    <>
      <ProductsNavbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutProducts;
