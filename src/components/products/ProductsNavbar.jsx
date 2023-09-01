import "../../assets/css/products_navbar.css";
import "../../assets/css/typograph.css";

import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";

import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";

function ProductsNavbar() {
  // STORE AUTH
  const { token, user } = useSelector((state) => state.auth);
  const { q, sort_by } = useSelector((state) => state.product);
  const { dataCart } = useSelector((state) => state.carts);

  const dispatch = useDispatch();

  // ITEM QTY & COUNTQTY
  const itemQty = dataCart.map((item) => item.qty);
  const countQty = itemQty.reduce((a, b) => a + b, 0);

  // STATE
  const [params, setParams] = useState({
    q,
    sort_by,
  });

  const handleOnChange = (event) => {
    setParams({
      ...params,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    // SET VALUE PARAMS Q AND SORT_BY TO STORE PRODUCT
    dispatch({ type: "ACTION_SEARCH", value: params.q });
    dispatch({ type: "ACTION_PAGE", value: 1 });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
  };

  function handleLogout() {
    const _id = user._id;
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
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

  const navigate = useNavigate();

  function handleToPageCart() {
    navigate("/cart");
  }

  function handleProfile() {
    navigate("/profile");
  }

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/" className="heading__4 ">
          MARKET.ID
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className=" w-100 d-flex justify-content-center align-items-center">
            <Form className="select__container my-md-0 mt-3" onSubmit={handleOnSubmit}>
              <InputGroup>
                <Form.Select className="select__seacrh" name="sort_by" value={params.sort_by} onChange={handleOnChange}>
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Form.Select>

                <Form.Control placeholder="Search product name..." className="input__seacrh border-0" name="q" value={params.q} onChange={handleOnChange} />

                <Button type="submit" variant="light" className=" d-flex align-items-center ">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            {token ? (
              <>
                <Button disabled={countQty === 0} className="me-md-3 me-0 my-md-0 my-3 btn btn-outline-light d-flex" onClick={handleToPageCart}>
                  <i className="bi bi-cart-fill"></i>
                  <span className="sub__heading__5 ">{countQty}</span>
                </Button>
                <Button variant="outline-light" className="mx-3 fw-bold" onClick={handleProfile}>
                  Profile
                </Button>
                <Button className=" text-light bg-danger fw-bold" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="me-md-3 me-0 my-md-0 my-3 btn btn-outline-light">
                  Login
                </Link>
                <Link to="/register" className="text-primary btn btn-light">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProductsNavbar;
