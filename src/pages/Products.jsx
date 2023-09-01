/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCards from "../components/products/ProductCards";

import { Row, Col, Form } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

import { axiosInstance as axios } from "../config/https";

import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

const Products = () => {
  const storeParamsProducts = useSelector((state) => state.product);
  const storeLoading = useSelector((state) => state.loading);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch({ type: "ACTION_PER_PAGE", value: e.target.value });
  };

  const handlePagination = (page) => {
    dispatch({ type: "ACTION_PAGE", value: page });
    setPagination({ ...pagination, page: page });
  };

  // Fecthing API
  useEffect(() => {
    if (storeParamsProducts) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get("/api/products", { params: { ...storeParamsProducts } })
        .then((response) => {
          setData(response.data.data);
          setPagination(response.data.pagination);
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
    <>
      <Row>
        {data.map((product, index) => (
          <Col key={`product-${index}`} lg="3" md="4" sm="6" xs="12" className="mb-4">
            <ProductCards product={product} />
          </Col>
        ))}
      </Row>

      {!storeLoading.isLoading && !data.length && (
        <div className=" d-flex flex-column justify-content-center align-items-center ">
          <h1>Ooppsss!!!</h1>
          <h5>Product Not Found</h5>
        </div>
      )}

      {!storeLoading.isLoading && (
        <Row>
          <Col xs="12" className=" d-flex justify-content-end align-items-center">
            <Form.Select value={storeParamsProducts.per_page} onChange={handleOnChange} className=" w-auto me-4 mb-3">
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Select>

            <PaginationControl page={pagination.page} total={pagination.total} limit={pagination.per_page} between={4} changePage={handlePagination} ellipsis={2}></PaginationControl>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Products;
