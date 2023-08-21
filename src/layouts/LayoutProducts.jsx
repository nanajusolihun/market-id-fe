import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProductsNavbar from "../components/products/ProductsNavbar";

const LayoutProducts = () => {
  return (
    <>
      <ProductsNavbar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutProducts;
