import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

import { Button, Card, Form, InputGroup, Row, Col } from "react-bootstrap";
import TableListAddress from "./TableListAddress";
import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance as axios } from "../../config/https";
import { useDispatch } from "react-redux";

export default function CardAddress () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [totalData, setTotalData] = useState(0)
  const [dataAddress, setDataAddress] = useState([])
  const [isLoad, setIsLoad] = useState(true);
  const [params, setParams] = useState({
    q: "",
    sort_by: "DECS",
    page: 1,
    per_page: 10,
  });

  function handleCreateFormAddress () {
    navigate("/address/create")
  }

  function handleChange(event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})
    setIsLoad(true)
  }

  function handleChangeSearch (event) {
    const key = event.target.name
    setParams({...params, [key]: event.target.value})

    if (event.target.value.length === 0) setIsLoad (true)
  }

  function handleSubmit (event) {
    event.preventDefault()
    setIsLoad(true)
  }

  function handlePagination  (page)  {
    setParams({...params, page})
    setIsLoad(true)
  };
  
  useEffect(() => {
    if (isLoad) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/address/list`, { params: { ...params } })
        .then(response => {
          setTotalData(response.data.pagination.total)
          setDataAddress(response.data.data)
        })
        .catch(error => {
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
      setIsLoad(false);
    }
  }, [isLoad, dispatch, params]);

  function handleDelete (id) {
    dispatch({ type: "SET_LOADING", value: true });
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/address/${id}/delete`)
        .then(response => {
          setIsLoad(true)
            // toast success
            toast("Delete address success", {
              position: toast.POSITION.TOP_RIGHT,
              type: toast.TYPE.SUCCESS,
            });
        })
        .catch(error => {
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
      <Card className=" mt-lg-0 mt-4">
        <Card.Body >
          <Row>
            {/* SORT BY AND SEARCH */}
            <Col lg="9" md="12" sm="12">
              <Form className=" mt-md-0 mt-2 mb-4" onSubmit={handleSubmit}>
                <InputGroup>
                  <Form.Select
                    name="sort_by"
                    value={params.sort_by}
                    onChange={handleChange}
                    style= {{width:"20%"}}
                    className="mt-sm-0 mb-2"
                  >
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                  </Form.Select>

                  <Form.Control 
                    name="q"
                    value={params.q}
                    onChange={handleChangeSearch}
                    placeholder="Search by address"
                    style= {{width:"80%"}}
                    className="mt-sm-0 mb-2"
                  />

                </InputGroup>
              </Form>

            </Col>
            
            {/* BUTTON CREATE */}
            <Col lg="3" md="12" sm="12">
              <Button
                variant="success"
                style= {{width:"25%"}}
                className="w-100 mt-lg-0 mt-2 fw-bold"
                onClick={handleCreateFormAddress}
              >
                {/* <i className="bi bi-pencil-fill"></i>  */}
                <i className="bi bi-pencil"></i> Create
              </Button>
            </Col>

            {/* TABLE DATA */}
            <Col xs="12" className="mt-md-2 mt-3">
              <TableListAddress list={dataAddress} handleDelete={handleDelete}/>
            </Col>

            {/* PER PAGE AND PAGINATION */}
            <Col xs="12" className="mt-5">
              <div className="d-flex justify-content-end align-items-center">
                <Form.Select 
                  name="per_page"
                  value={params.per_page}
                  onChange={handleChange}
                  className=" w-auto me-4 mb-3"
                  >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </Form.Select>

                <PaginationControl
                  page={params.page} 
                  total={totalData} 
                  limit={params.per_page} 
                  between={4}
                  ellipsis={2}
                  changePage={handlePagination}
                >
                </PaginationControl>
            </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}