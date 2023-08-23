import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CartsNavbar from "../components/Carts/CartsNavBar";

const LayoutCarts = () => {
  return (
    <>
      <CartsNavbar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutCarts;
