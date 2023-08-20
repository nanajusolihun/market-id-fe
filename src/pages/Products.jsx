/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "../components/products/ProductCards";
import { Row, Col } from "react-bootstrap";

import { axiosInstance as axios } from "../config/https";

import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

const Products = () => {
  const storeParamsProducts = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  // STORE LOADING
  const dispatch = useDispatch();

  // Fecthing API
  useEffect(() => {
    if (storeParamsProducts) {
      axios
        .get("/products", { params: { ...storeParamsProducts } })
        .then((response) => {
          setData(response.data.data);
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
  }, [storeParamsProducts]);
  return (
    <Row>
      {data.map((product, index) => (
        <Col key={`product-${index}`} lg="3" md="4" sm="6" xs="12">
          <ProductCards product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default Products;
