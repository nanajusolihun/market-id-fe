import "../../assets/css/products_navbar.css";
import "../../assets/css/typograph.css";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance as axios } from "../../config/https";

import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

import { Container, Button, Form, InputGroup, Navbar, Nav } from "react-bootstrap";

function ProductsNavbar() {
  // STORE AUTH
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const _id = user._id;
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .post(`/users/${_id}/logout`)
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

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/" className="heading__4 ">
          MARKET.ID
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className=" w-100 d-flex justify-content-center align-items-center">
            <Form className="select__container my-md-0 mt-3">
              <InputGroup>
                <Form.Select className="select__seacrh ">
                  <option value="1">Sort By</option>
                  <option value="2">15</option>
                  <option value="3">20</option>
                </Form.Select>

                <Form.Control placeholder="Search product name..." className="input__seacrh border-0" />

                <Button variant="light" className=" d-flex align-items-center ">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>

          <Nav>
            {token ? (
              <>
                <Link to="/cart" className="me-md-3 me-0 my-md-0 my-3 btn btn-outline-light d-flex">
                  <i className="bi bi-cart-fill"></i>
                  <span className="sub__heading__5 ms-2">0</span>
                </Link>
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
