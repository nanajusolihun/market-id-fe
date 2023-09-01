import { Col, Row } from "react-bootstrap";

import ABreadCrumb from "../components/ABreadCrumb";
import AListGroup from "../components/Customer/AListGroup";
import CardAddress from "../components/Customer/CardAddress";

export default function Address() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
      active: false,
    },
    {
      link: "/address",
      title: "Address",
      active: false,
    },
    {
      link: "/history",
      title: "History",
      active: false,
    },
  ];

  return (
    <>
      <Row>
        <Col xs="12" className="fw-bold text-dark">
          <ABreadCrumb options={options} />
        </Col>

        <Col md="3">
          <AListGroup menus={menus} />
        </Col>
        <Col md="9">
          <CardAddress />
        </Col>
      </Row>
    </>
  );
}
