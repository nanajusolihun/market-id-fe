/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";
import FormatCurrency from "../../utils/currency";
import PopupCheckout from "./PopupCheckout";

export default function CartsCheckouts(props) {
  const { isCheckouts = false, isStatus = true, detailInvoices = { address_id: "", sub_total: 0, ppn: 0, total: 0 }, handleConfirmDone = () => {} } = props;
  const [optionsAddress, setOptionsAddress] = useState([]);
  const [fullAddress, setFullAddress] = useState("-");

  const { dataCart } = useSelector((state) => state.carts);
  const dataSubTotal = dataCart.map((cart) => cart.sub_total);
  const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
  const PPN10percen = subTotal * 0.1;
  const total = subTotal + PPN10percen;

  const dispatch = useDispatch();

  // SELECT ADDRESS FOR CHECKOUT
  useEffect(() => {
    if (!optionsAddress.length && isCheckouts) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get("/address/list")
        .then((response) => {
          setOptionsAddress(response.data.data);
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
  }, [optionsAddress, dispatch, isCheckouts]);

  // FOR DETAIL ADDRESS INVOICE
  useEffect(() => {
    if (detailInvoices.address_id.length > 0) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get(`/address/${detailInvoices.address_id}/detail`)
        .then((response) => {
          const { name, address, village, district, regency, province, passcode } = response.data.data;
          setFullAddress(`${name} : ${address}, ${village.name}, ${district.name}, ${regency.name}, ${province.name}, ${passcode}`);
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
  }, [detailInvoices]);

  const [address, setAddress] = useState({
    _id: "",
    name: "",
  });

  function handleChangeAddress(event) {
    const _id = event.target.value;

    const findAddressById = optionsAddress.find((address) => address._id === _id);

    if (!findAddressById) {
      setFullAddress("-");
      setAddress({ _id: "", name: "" });
    } else {
      setAddress({ _id: findAddressById._id, name: findAddressById.name });
      const address = findAddressById.address;
      const village = findAddressById.village.name;
      const district = findAddressById.district.name;
      const regency = findAddressById.regency.name;
      const province = findAddressById.province.name;
      const passcode = findAddressById.passcode;

      setFullAddress(`${address} ${village} ${district} ${regency} ${province} ${passcode}`);
    }
  }

  // POPUP CHECKOUT
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function handlePayment() {
    const cart = dataCart.map((cart) => {
      return {
        name: cart.name,
        price: cart.price,
        image: cart.image,
        category: cart.category,
        qty: cart.qty,
        sub_total: cart.sub_total,
      };
    });

    const dataCheckout = { cart, address, total };

    // STORE
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post("/checkout/new", dataCheckout)
      .then((response) => {
        const invoice = response.data.data.invoice;
        // TOAST ERROR
        toast("Checkout product success", {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        setShow(false);
        navigate(`/invoice/${invoice}`);
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
      <Card className="w-100">
        <Card.Body>
          {isCheckouts ? (
            <>
              <Form.Label htmlFor="form-address" className="fw-bold mt-2">
                ADDRESS
              </Form.Label>
              <Form.Select id="form-address" value={address._id} onChange={handleChangeAddress}>
                <option value="">Select your address</option>
                {optionsAddress.map((address, index) => (
                  <option key={`address-${index}`} value={address._id}>
                    {address.name}
                  </option>
                ))}
              </Form.Select>
              <Card.Text className="mt-2 mb-5">{fullAddress}</Card.Text>

              <div className="  d-flex justify-content-between align-items-center my-3">
                <Card.Subtitle>Sub Total</Card.Subtitle>
                <Card.Subtitle>{FormatCurrency(subTotal)}</Card.Subtitle>
              </div>

              <div className=" d-flex justify-content-between align-items-center my-3">
                <Card.Subtitle>PPN (10%)</Card.Subtitle>
                <Card.Subtitle>{FormatCurrency(PPN10percen)}</Card.Subtitle>
              </div>

              <div className=" d-flex justify-content-between align-items-center my-4">
                <Card.Subtitle className="fs-5 fw-bold">Total Price</Card.Subtitle>
                <Card.Subtitle className=" fs-5 fw-bold">{FormatCurrency(total)}</Card.Subtitle>
              </div>

              <Button
                size="lg"
                disabled={address._id.length === 0}
                variant={address._id ? "primary" : "secondary"}
                className="mt-4 w-100 fw-bold"
                onClick={() => {
                  setShow(true);
                }}
              >
                CHECKOUT PRODUCT
              </Button>
            </>
          ) : (
            <>
              <Form.Label htmlFor="form-address" className="fw-bold mt-2">
                ADDRESS :
              </Form.Label>
              <Card.Text className="mt-2 mb-5">{fullAddress}</Card.Text>

              <div className="  d-flex justify-content-between align-items-center my-3">
                <Card.Subtitle>Sub Total</Card.Subtitle>
                <Card.Subtitle>{FormatCurrency(detailInvoices.sub_total)}</Card.Subtitle>
              </div>

              <div className=" d-flex justify-content-between align-items-center my-3">
                <Card.Subtitle>PPN (10%)</Card.Subtitle>
                <Card.Subtitle>{FormatCurrency(detailInvoices.ppn)}</Card.Subtitle>
              </div>

              <div className=" d-flex justify-content-between align-items-center my-4">
                <Card.Subtitle className="fs-5 fw-bold">Total Price</Card.Subtitle>
                <Card.Subtitle className=" fs-5 fw-bold">{FormatCurrency(detailInvoices.total)}</Card.Subtitle>
              </div>

              {!isStatus && (
                <Button size="lg" variant="success" className="mt-4 w-100 fw-bold" onClick={handleConfirmDone}>
                  CONFIRM DONE
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* POPUP CHECKOUT */}
      <PopupCheckout
        show={show}
        handleCancel={() => {
          setShow(false);
        }}
        handlePayment={handlePayment}
      />
    </>
  );
}
