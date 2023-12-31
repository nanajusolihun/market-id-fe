import { React, useState } from "react";
import { useFormik } from "formik";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { axiosInstance as axios } from "../config/https";

const initialValues = {
  full_name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  full_name: Yup.string().required("Field is Required").min(4, "Input must be at least 4 characters").max(30, "Input must be at most 30 characters"),
  email: Yup.string().required("Email is Required").email(),
  password: Yup.string().required("Field is Required").min(8).max(12),
});

// VARIABLE REGISTER
const Register = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // STORE
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  function handleRegister(form) {
    // Set_loading
    dispatch({ type: "SET_LOADING", value: true });
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/new`, form)
      .then((response) => {
        const message = response.data.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });

        navigate("/login");
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // Set_loading
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Register</h4>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="full_name" className="mb-2">
                Full Name
              </Form.Label>
              <Form.Control
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Elon Musk"
                value={formik.values.full_name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={formik.touched.full_name && formik.errors.full_name && "border-danger"}
              />

              {formik.touched.full_name && formik.errors.full_name && <small className="text-danger test__5">{formik.errors.full_name}</small>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="email" className="mb-2">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={formik.touched.email && formik.errors.email && "border-danger"}
              />

              {formik.touched.email && formik.errors.email && <small className="text-danger test__5">{formik.errors.email}</small>}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" className="mb-2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={formik.touched.password && formik.errors.password && "border-danger"}
                />

                <Button variant="light" onClick={handleShowPassword}>
                  {show ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                </Button>
              </InputGroup>

              {formik.touched.password && formik.errors.password && <small className="text-danger test__5">{formik.errors.password}</small>}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 my-4">
              Register
            </Button>
          </Form>

          <p className="test__5 text-center mb-0">
            Already have an account? please <Link to="/login">login</Link>.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Register;
