import { Row, Col,  } from "react-bootstrap";

import FormAddress from "./Forms";
import ABreadCrumb from "../ABreadCrumb";
import AListGroup from "../Customer/AListGroup";

export default function CreateFormAddress () {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: false,
    },
    {
      href: "/address/create",
      name: "Create",
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
      link: "/address/create",
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
        <FormAddress />
      </Col>
    </Row>
  </>
  )
}
