import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import ABreadCrumb from "../components/ABreadCrumb";
import CartsListItem from "../components/Carts/CartsListItem";
import CartsCheckouts from "../components/Carts/CartsChecouts";

export default function Carts() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/cart",
      name: "Cart",
      active: true,
    },
  ];

  const storeCarts = useSelector((state) => state.carts);

  return (
    <>
      <Row>
        <Col xs="12" className="fw-bold">
          <ABreadCrumb options={options} />
        </Col>
        <Col lg="8" md="12" sm="12" xs="12">
          <div style={{ height: "33rem", overflowY: "auto" }}>
            {storeCarts.dataCart.length ? storeCarts.dataCart.map((cart, index) => <CartsListItem key={`cart-item-${cart._id}`} cart={cart} index={index} isAction />) : <h4 className="mt-5">Cart List Empty</h4>}
          </div>
        </Col>
        <Col lg="4" md="12" sm="12" xs="12">
          <CartsCheckouts isCheckouts />
        </Col>
      </Row>
    </>
  );
}
