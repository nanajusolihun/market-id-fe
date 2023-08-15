import { React, useState } from "react";
import { useFormik } from "formik";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

import * as Yup from "yup";
import { axiosInstance as axios } from "../config/https";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Email is Required").email(),
  password: Yup.string().required("Field is Required").min(8).max(12),
});

// LOGIN
const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(form) {
    axios
      .post("/users/login", form)
      .then((response) => {
        const { data, message } = response.data;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });

        navigate("/");
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      });
  }

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Login</h4>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email" className="mb-2">
                Email
              </Form.Label>
              <Form.Control id="email" name="email" type="email" placeholder="example@gmail.com" value={formik.values.email} onChange={formik.handleChange} className={formik.errors.email && "border-danger"} />

              {formik.errors.email && <small className="text-danger test__5">{formik.errors.email}</small>}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" className="mb-2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control id="password" name="password" type={show ? "text" : "password"} placeholder="Password" value={formik.values.password} onChange={formik.handleChange} className={formik.errors.password && "border-danger"} />

                <Button variant="light" onClick={handleShowPassword}>
                  {show ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash-fill"></i>}
                </Button>
              </InputGroup>

              {formik.errors.password && <small className="text-danger test__5">{formik.errors.password}</small>}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 my-4">
              Login
            </Button>
          </Form>

          <p className="test__5 text-center mb-0">
            Don,t have an account? please <Link to="/register">register</Link>.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Login;
