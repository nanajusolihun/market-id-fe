import { Row, Col,  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import FormAddress from "./Forms";
import ABreadCrumb from "../ABreadCrumb";
import AListGroup from "../Customer/AListGroup";
import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";


export default function EditFormAddress () {
  const dispatch = useDispatch();
  const { id } = useParams();

  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: false,
    },
    {
      href: "/address/edit",
      name: "Edit",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
      active: false,
    },
    {
      link: `/address/edit/${id}`,
      title: "Address",
      active: false,
    },
    {
      link: "/history",
      title: "History",
      active: false,
    },
  ];

  const [detail, setDetail] = useState({});

  useEffect(() => {
    // Set_loading
    dispatch({ type: "SET_LOADING", value: true });
    // GET API Wilayah Indonesia
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/address/${id}/detail`)
      .then((response) => {
        setDetail(response.data.data)
      })
      .catch((error) => {
        // Toast Message Error
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

  }, [id, dispatch])

  return (
    <>
    <Row>
      <Col xs="12" className="fw-bold text-dark">
        <ABreadCrumb options={options} />
      </Col>

      <Col md="3">
        <AListGroup menus={menus} />
      </Col>
      <Col md="9">
        <FormAddress isEdit={true} detail={detail} />
      </Col>
    </Row>
  </>
  )
}