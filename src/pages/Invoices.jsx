import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Col, Row, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import ABreadCrumb from "../components/ABreadCrumb";
import CartsListItem from "../components/Carts/CartsListItem";
import CartsCheckouts from "../components/Carts/CartsChecouts";
import { axiosInstance as axios } from "../config/https";
import handleErrorMessage from "../utils/handleErrorMessage";

export default function Invoices() {
  const [isUpdate, setIsUpdate] = useState(true);
  const { code } = useParams();
  const dispatch = useDispatch();
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/invoices",
      name: "Invoices",
      active: true,
    },
  ];

  const [data, setData] = useState({});
  const [carts, setCarts] = useState([]);
  const [detailInvoices, setDetailInvoices] = useState({
    address_id: "",
    sub_total: 0,
    ppn: 0,
    total: 0,
  });

  useEffect(() => {
    if (isUpdate) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/checkout/${code}/detail`)
        .then((response) => {
          setData(response.data.data);
          const carts = response.data.data.cart;
          setCarts(carts);

          const address = response.data.data.address;
          const dataSubTotal = carts.map((cart) => cart.sub_total);
          const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
          const ppn = subTotal * 0.1;
          const total = subTotal + ppn;

          setDetailInvoices({ address_id: address._id, sub_total: subTotal, ppn, total });
        })
        .catch((error) => {
          // TOAST ERROR
          const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", value: false });
          setIsUpdate(false);
        });
    }
  }, [code, dispatch, isUpdate]);

  // const storeCarts = useSelector((state) => state.carts);
  function handleConfirmDone() {
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/checkout/${code}/confirm`, { status: true })
      .then((response) => {
        setIsUpdate(true);
      })
      .catch((error) => {
        // TOAST ERROR
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  return (
    <>
      <Row>
        <Col xs="12" className="fw-bold">
          <ABreadCrumb options={options} />
        </Col>
        <Col xs="12">
          <Card className=" rounded-0 mb-4">
            <Card.Body>
              <Card.Title className="text-primary fs-5 fw-bold">Market.ID</Card.Title>

              <div className=" d-flex justify-content-between align-items-center">
                <p className="mb-0 sub__heading__4">Order Name : {data.user ? data.user.full_name : "-"}</p>
                <h6 className="sub__heading__4">Invoice No : {data.invoice || "-"}</h6>
              </div>

              <div className=" d-flex justify-content-between align-items-center">
                <p className="mb-0 sub__heading__4">Email Name : {data.user ? data.user.email : "-"}</p>
                {data.status ? (
                  <h6 className="sub__heading__3 text-success fw-bold">
                    STATUS PAYMENT SUCCESS <i className="bi bi-check-lg"></i>
                  </h6>
                ) : (
                  <h6 className="sub__heading__3 text-warning fw-bold">
                    STATUS WAITING PAYMENT <i className="bi bi-exclamation-triangle"></i>
                  </h6>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="8" md="12" sm="12" xs="12">
          <div style={{ height: "calc(100vh - 20rem)", overflowY: "auto" }}>{carts.length ? carts.map((cart, index) => <CartsListItem key={`cart-checkouts-${cart.name}`} cart={cart} index={index} />) : <h4 className="m">Cart List Empty</h4>}</div>
        </Col>
        <Col lg="4" md="12" sm="12" xs="12">
          <CartsCheckouts detailInvoices={detailInvoices} isStatus={data.status} handleConfirmDone={handleConfirmDone} />
        </Col>
      </Row>
    </>
  );
}
