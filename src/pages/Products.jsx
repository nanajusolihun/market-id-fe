/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCards from "../components/products/ProductCards";
import { Row, Col } from "react-bootstrap";

import { axiosInstance as axios } from "../config/https";

import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

const Products = () => {
  // Menangkap Data
  const [data, setData] = useState([]);

  // STORE LOADING
  const dispatch = useDispatch();

  // SEARCH
  const [params, setParams] = useState({
    q: "",
    sort_by: "desc",
    page: 1,
    per_page: 20,
  });

  // Fecthing API
  useEffect(() => {
    // Set_loading
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .get("/products", { params: { ...params } })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className="mx-2">
      {data.map((product, index) => (
        <Col key={`product-${index}`} lg="3" md="4" sm="6" xs="12">
          <ProductCards product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default Products;
