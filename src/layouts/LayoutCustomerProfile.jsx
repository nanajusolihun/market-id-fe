import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerProfileNavbar from "../components/Customer/CustomerProfileNavbar";

const LayoutCustomerProfile = () => {
  return (
    <>
      <CustomerProfileNavbar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutCustomerProfile;
