/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";
import FormatCurrency from "../../utils/currency";

export default function CartsCheckouts() {
  const [optionsAddress, setOptionsAddress] = useState([]);

  const { dataCart } = useSelector((state) => state.carts);
  const dataSubTotal = dataCart.map((cart) => cart.sub_total);
  const subTotal = dataSubTotal.reduce((a, b) => a + b);
  const PPN10percen = subTotal * 0.1;
  const Total = subTotal + PPN10percen;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!optionsAddress.length) {
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
  }, [optionsAddress, dispatch]);

  const [fullAddress, setFullAddress] = useState("-");
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

  return (
    <Card>
      {JSON.stringify(subTotal)}
      <Card.Body>
        <Form.Label htmlFor="form-address" className="fw-bold">
          Address
        </Form.Label>
        <Form.Select id="form-address" value={address._id} onChange={handleChangeAddress}>
          <option value="">Select your address</option>
          {optionsAddress.map((address, index) => (
            <option key={`address-${index}`} value={address._id}>
              {address.name}
            </option>
          ))}
        </Form.Select>
        <Card.Text className="mt-2 mb-4">{fullAddress}</Card.Text>

        <div className="  d-flex justify-content-between align-items-center mb-3">
          <Card.Subtitle>Sub Total</Card.Subtitle>
          <Card.Subtitle>{FormatCurrency(subTotal)}</Card.Subtitle>
        </div>

        <div className=" d-flex justify-content-between align-items-center mb-3">
          <Card.Subtitle>PPN (10%)</Card.Subtitle>
          <Card.Subtitle>{FormatCurrency(PPN10percen)}</Card.Subtitle>
        </div>

        <div className=" d-flex justify-content-between align-items-center mb-4">
          <Card.Subtitle>Total</Card.Subtitle>
          <Card.Subtitle>{FormatCurrency(Total)}</Card.Subtitle>
        </div>

        <Button disabled={address._id.length === 0} variant={address._id ? "primary" : "secondary"} className="w-100 fw-bold">
          Checkout
        </Button>
      </Card.Body>
    </Card>
  );
}
