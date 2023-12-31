/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Col, Row, Form, Button } from "react-bootstrap";

import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";
import ASelectOptions from "../ASelectOptions";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  province: {
     _id: "",
     name: "",
  },
  regency: {
     _id: "",
     name: "",
  },
  district: {
     _id: "",
     name: "",
  },
  village: {
     _id: "",
     name: "",
  },
  passcode: "",
  address: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Field name  is Required")
  .min(4, "Input must be at least 4 characters")
  .max(28, "Input must be at most 10 characters"),
  province: Yup.object().shape({
    _id: Yup.string().required("Field Province is Required"),
  }),
  regency: Yup.object().shape({
    _id: Yup.string().required("Field Region/City is Required"),
  }),
  district: Yup.object().shape({
    _id: Yup.string().required("Field District is Required"),
  }),
  village: Yup.object().shape({
    _id: Yup.string().required("Field Village is Required"),
  }),
  passcode: Yup.string().required("Field passcode is Required"),
  address: Yup.string().required("Field ddress is Required")
  .min(10, "Input must be at least 10 characters")
})

export default function FormAddress ({ isEdit = false, detail = {} }) {
  const dispatch = useDispatch();

  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleonSubmit,
  });

  function handleError (key, sub_key) {
    if ( sub_key ) return (formik.touched[key] && formik.errors[key]) && formik.touched[key][sub_key] && formik.errors[key][sub_key]

    return formik.touched[key] && formik.errors[key]
  }

  const [isLoadProvince, setIsLoadProvince] = useState( true );
  const [dataProvince, setDataProvince] = useState([]);

  const fetchData = useCallback(async() => {
    // Set_loading
    dispatch({ type: "SET_LOADING", value: true });
    
    formik.setFieldValue("name", detail.name)
    formik.setFieldValue("passcode", detail.passcode)
    formik.setFieldValue("address", detail.address)
    
    await getOptionsProvince()
    formik.setFieldValue("province", {_id: detail.province._id, name: detail.province.name})

    await getOptionsRegency(detail.province._id)
    formik.setFieldValue("regency", {_id: detail.regency._id, name: detail.regency.name})
    
    await getOptionsDistrict(detail.regency._id)
    formik.setFieldValue("district", {_id: detail.district._id, name: detail.district.name})
    
    await getOptionsVillage(detail.district._id)
    formik.setFieldValue("village", {_id: detail.village._id, name: detail.village.name})

    // Set_loading
    dispatch({ type: "SET_LOADING", value: false });
  }, [ dispatch, detail ])

  // Props Detail
  useEffect (() => {
    if (isEdit && JSON.stringify(detail) !== "{}") {
      fetchData()
    }
  }, [detail, isEdit, fetchData]);

  // Get Options Province
  const getOptionsProvince = useCallback(async() => {
    dispatch({ type: "SET_LOADING", value: true });
    return axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/provinces`)
    .then((response) => {
      setDataProvince(response.data.data)
    })
    .catch((error) => {
      const message = error.response?.data?.message;
      toast(handleErrorMessage(message), {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.ERROR,
      });
    })
    .finally(() => {
      dispatch({ type: "SET_LOADING", value: false });
      setIsLoadProvince(false)
    });
  }, [dispatch]);

  useEffect(() => {
    if (isLoadProvince && !isEdit) {
      getOptionsProvince()
    }
  }, [isLoadProvince, getOptionsProvince, isEdit]);

  
  async function handleChangeProvince (event, key) {
    formik.setFieldValue(event.target.name, event.target.value)
    const findByID = dataProvince.find((province) => province.id === event.target.value)
    formik.setFieldValue(key, findByID ? findByID.name : "")

    if (findByID) await getOptionsRegency(findByID.id)
    
      formik.setFieldValue("regency", { _id: "", name: ""});
      formik.setFieldValue("district", { _id: "", name: ""});
      formik.setFieldValue("village",{ _id: "", name: ""});
  }

  // DATA REGENCY
  const [dataRegency, setDataRegency] = useState([]);
  async function getOptionsRegency (id) {
    dispatch({ type: "SET_LOADING", value: true });
    return axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/regencies/${id}`)
      .then((response) => {
        setDataRegency(response.data.data)
      })
      .catch((error) => {
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

  async function handleChangeRegency (event, key) {
    formik.setFieldValue(event.target.name, event.target.value)
    const findByID = dataRegency.find((regency) => regency.id === event.target.value)
    formik.setFieldValue(key, findByID ? findByID.name : "")

    if (findByID) await getOptionsDistrict(findByID.id)
      formik.setFieldValue("district", { _id: "", name: ""});
      formik.setFieldValue("village",{ _id: "", name: ""});
  }

  // DATA DISTRICT
  const [dataDistrict, setDataDistrict] = useState([]);
  async function getOptionsDistrict (id) {
    dispatch({ type: "SET_LOADING", value: true });
    return axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/districts/${id}`)
      .then((response) => {
        setDataDistrict(response.data.data)
      })
      .catch((error) => {
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

  async function handleChangeDistrict (event, key) {
    formik.setFieldValue(event.target.name, event.target.value)
    const findByID = dataDistrict.find((district) => district.id === event.target.value)
    formik.setFieldValue(key, findByID ? findByID.name : "")

    if (findByID) await getOptionsVillage(findByID.id)

    formik.setFieldValue("village",{ _id: "", name: ""});
  }

  // DATA VILLAGE
  const [dataVillage, setDataVillage] = useState([]);
  async function getOptionsVillage (id) {
    dispatch({ type: "SET_LOADING", value: true });
    return axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/villages/${id}`)
    .then((response) => {
      setDataVillage(response.data.data)
    })
    .catch((error) => {
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

  function handleChangeVillage (event, key) {
    formik.setFieldValue(event.target.name, event.target.value)
    const findByID = dataVillage.find((village) => village.id === event.target.value)

    formik.setFieldValue(key, findByID ? findByID.name : "")
  }

  const navigate = useNavigate();
  // CREATE / SUBMIT
  function handleonSubmit (values) {
    if (!isEdit) createAddress (values)
    else editAddress(values)
  }

  function createAddress (payload) {
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/address/new`, payload)
    .then((response) => {
      toast(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      navigate("/address")
    })
    .catch((error) => {
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

  function editAddress (payload) {
    dispatch({ type: "SET_LOADING", value: true });
    axios
    .put(`${process.env.REACT_APP_API_BASE_URL}/address/${detail._id}/update`, payload)
    .then((response) => {
      toast(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        type: toast.TYPE.SUCCESS,
      });
      navigate("/address")
    })
    .catch((error) => {
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

  function handleCancel () {
    formik.resetForm()
    navigate("/address")
  }

  return (
    <Card className="p-4">
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
        <Row>

          {/* NAME ADDRESS */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-4 b-2">
                <Form.Label htmlFor="name" className="mb-2"
                >
                  Name
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name Address"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleError ( "name" ) && "border-danger"}
                />
                  {formik.touched.name && formik.errors.name && <small className="text-danger test__5">{formik.errors.name}</small>}
               </Form.Group>
            </Col>

             {/* PROVINCE */}
             <Col md="6">
              <ASelectOptions
                id="province"
                label="Province"
                name="province._id"
                value={formik.values.province._id}
                handleBlur={formik.handleBlur}
                keyChange="province.name"
                handleChange={(event, keyChange) => handleChangeProvince(event, keyChange)}
                isError={handleError("province", "_id")}
                msgError={formik.errors.province && formik.errors.province._id}
                options={dataProvince}
              />
            </Col>

             {/* REGION / CITY */}
             <Col md="6">
              <ASelectOptions
                id="regency"
                label="Region/City"
                name="regency._id"
                value={formik.values.regency._id}
                handleBlur={formik.handleBlur}
                keyChange="regency.name"
                handleChange={(event, keyChange) => handleChangeRegency(event, keyChange)}
                isError={handleError("regency", "_id")}
                msgError={formik.errors.regency && formik.errors.regency._id}
                options={dataRegency}
              />
            </Col>

             {/* DISTRICT */}
             <Col md="6">
              <ASelectOptions
                id="district"
                label="District"
                name="district._id"
                value={formik.values.district._id}
                handleBlur={formik.handleBlur}
                keyChange="district.name"
                handleChange={(event, keyChange) => handleChangeDistrict(event, keyChange)}
                isError={handleError("district", "_id")}
                msgError={formik.errors.district && formik.errors.district._id}
                options={dataDistrict}
              />
            </Col>
            
             {/* VILLAGE*/}
             <Col md="6">
              <ASelectOptions
                id="village"
                label="Village"
                name="village._id"
                value={formik.values.village._id}
                handleBlur={formik.handleBlur}
                keyChange="village.name"
                handleChange={(event, keyChange) => handleChangeVillage(event, keyChange)}
                isError={handleError("village", "_id")}
                msgError={formik.errors.village && formik.errors.village._id}
                options={dataVillage}
              />
            </Col>

             {/* PASSCODE */}
             <Col md="6">
              <Form.Group className="mt-lg-0 mt-4 b-2">
                <Form.Label htmlFor="passcode" className="mb-2">
                  Passcode
                </Form.Label>
                <Form.Control
                  id="passcode"
                  name="passcode"
                  type="text"
                  placeholder="Passcode"
                  value={formik.values.passcode}
                  maxLength="5"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleError ( "passcode" ) && "border-danger"}
                />
                  {formik.touched.passcode && formik.errors.passcode && <small className="text-danger test__5">{formik.errors.passcode}</small>}
               </Form.Group>
            </Col>

             {/* PASSCODE */}
             <Col md="12">
              <Form.Group className="mt-lg-0 mt-4 b-2">
                <Form.Label htmlFor="address" className="mb-2">
                  Address
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Input your address"
                  value={formik.values.address}
                  maxLength="100"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleError ( "address" ) && "border-danger"}
                />
                  {formik.touched.address && formik.errors.address && <small className="text-danger test__5">{formik.errors.address}</small>}
               </Form.Group>
            </Col>

            <Col xs="12" className=" d-flex justify-content-end align-items-center">
              {isEdit && (
                  <Button type="button" variant="secondary" className=" mt-4 me-2" onClick={handleCancel}>Cancel</Button>
                )}
                <Button type="submit" variant="success" className=" mt-4">{isEdit ? "Update" : "Create"}</Button>
            </Col>
            
          </Row>
        </Form>
      </Card.Body>
    </Card> 
  )
}