/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Image, Form, Button } from "react-bootstrap";

import defaultProfile from "../../assets/images/default_image_profile.jpg";
import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";

const initialValues = {
  full_name: "",
  email: "",
  file_name: "",
  // password: "",
  status: false,
};

const validationSchema = Yup.object({
  full_name: Yup.string().required("Field is Required").min(4, "Input must be at least 4 characters").max(30, "Input must be at most 30 characters"),
  email: Yup.string().required("Email is Required").email(),
  file_name: Yup.string().required("file_name is Required"),
  // password: Yup.string().required("Field is Required").min(8).max(12),
});

export default function CardProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const _id = user._id;

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdateProfile,
  });

  const [isLoad, setIsLoad] = useState(true);
  const [urlImage, setUrlImage] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isLoad) {
      // Set_loading
      dispatch({ type: "SET_LOADING", value: true });

      // GET DATA USER DETAIL
      axios
        .get(`/users/${_id}/detail`)
        .then((response) => {
          const detailUsers = response.data.data;

          formik.setFieldValue("full_name", detailUsers.full_name);
          formik.setFieldValue("email", detailUsers.email);
          formik.setFieldValue("status", detailUsers.status);

          // SET URL IMAGE
          const getUrlImage = detailUsers.image.url;
          setUrlImage(getUrlImage);
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
          setIsLoad(false);
        });
    }
  }, [isLoad, _id, dispatch, formik, urlImage]);

  function handleUpdateProfile(form) {
    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("image", image);
    formData.append("status", form.status);

    // Set_loading
    dispatch({ type: "SET_LOADING", value: true });

    // GET DATA USER DETAIL
    axios
      .put(`/users/${_id}/update`, formData)
      .then((response) => {
        console.log("ini res", response);

        toast(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
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
        handleResetForm();
      });
  }

  function handleChangeImage(event) {
    const file = event.currentTarget.files[0];
    // set input file_name
    formik.setFieldValue("file_name", event.currentTarget.value);
    // set input image
    setImage(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        // set url image
        setUrlImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  }

  const refImage = useRef();
  function handleResetForm() {
    // reset from input image
    refImage.current.value = null;
    // reset formik
    formik.resetForm();
    setIsLoad(true);
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Card className="p-4 mt-md-0 mt-3">
        <Card.Body>
          {/* IMAGE PROFILE */}
          <Row>
            <Col lg="4" xs="12" className="text-center">
              <Image style={{ width: "200px", height: "200px", aspectRatio: "3/2", objectFit: "cover" }} src={urlImage ? urlImage : defaultProfile} rounded />
            </Col>

            {/* FULLNAME AND EMAIL */}
            <Col lg="4" xs="12">
              <Form.Group className="mt-lg-0 mt-4 b-2">
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

              <Form.Group className="mb-2 mt-3">
                <Form.Label htmlFor="email" className="mb-2">
                  Email
                </Form.Label>

                <Form.Control
                  disabled
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
            </Col>

            {/* IMAGE AND STATUS */}
            <Col lg="4" xs="12">
              <Form.Group className="mb-2 mt-lg-0 mt-3">
                <Form.Label htmlFor="file_name" className="mb-2">
                  Image
                </Form.Label>

                <Form.Control
                  ref={refImage}
                  id="file_name"
                  name="file_name"
                  type="file"
                  accept="image/*"
                  placeholder="chosee file"
                  value={formik.values.file_name}
                  onBlur={formik.handleBlur}
                  onChange={handleChangeImage}
                  className={formik.touched.file_name && formik.errors.file_name && "border-danger"}
                />
                {formik.touched.file_name && formik.errors.file_name && <small className="text-danger test__5">{formik.errors.file_name}</small>}
              </Form.Group>

              <Form.Group className="mb-2 mt-3">
                <Form.Label htmlFor="status" className="mb-2">
                  Status
                </Form.Label>

                <Form.Select
                  disabled
                  id="status"
                  name="status"
                  type="text"
                  placeholder="status"
                  value={formik.values.status}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={formik.touched.status && formik.errors.status && "border-danger"}
                >
                  <option value={false}>NON ACTIVE</option>
                  <option value={true}>ACTIVE</option>
                </Form.Select>
                {formik.touched.status && formik.errors.status && <small className="text-danger test__5">{formik.errors.status}</small>}
              </Form.Group>
            </Col>

            <Col className="mt-5 d-flex justify-content-end">
              <Button type="button" variant="danger" className="me-3" onClick={handleResetForm}>
                Cancel
              </Button>
              <Button type="submit" variant="success" className="ms-3">
                Update
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
}
