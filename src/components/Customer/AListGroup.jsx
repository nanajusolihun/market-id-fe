import { ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { axiosInstance as axios } from "../../config/https";
import handleErrorMessage from "../../utils/handleErrorMessage";

export default function AListGroup({ menus }) {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const _id = user._id;
    dispatch({ type: "SET_LOADING", value: true });

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
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

  const location = useLocation();
  const navigate = useNavigate();

  function handleGoToLink(link) {
    navigate(`${link}`);
  }
  return (
    <ListGroup>
      {menus.map((menu, index) => (
        <ListGroup.Item key={`list-menu-${menu.title}-${index}`} action active={menu.link === location.pathname} onClick={() => handleGoToLink(menu.link)}>
          {menu.title}
        </ListGroup.Item>
      ))}

      <ListGroup.Item action className="fw-bold text-danger" onClick={() => handleLogout()}>
        Logout
      </ListGroup.Item>
    </ListGroup>
  );
}
