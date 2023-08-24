import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import FormatCurrency from "../../utils/currency";
import { useSelector, useDispatch } from "react-redux";

const CartsListItem = (props) => {
  const { cart, index, isAction = false } = props;
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  function handleRemoveItemCart() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty -= 1;
        item.sub_total = item.qty * item.price;
      }
    });
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }

  function handleAddItemCart() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty += 1;
        item.sub_total = item.qty * item.price;
      }
    });
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }

  function handleDeleteByIndex() {
    storeCarts.dataCart.splice(index, 1);

    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }

  return (
    <Card className="mb-2">
      <Card.Body className=" d-flex justify-content-between align-items-center">
        <div className=" d-flex justify-content-center align-items-center">
          <Image src={cart.image.url} alt={`product-${cart.name}`} className=" object-fit-cover" width="90" height="100" />

          <h6 className="ms-2">{cart.name}</h6>
        </div>
        {/* <h6>{FormatCurrency(cart.sub_total)}</h6> */}

        {isAction ? (
          <>
            <h6>{FormatCurrency(cart.sub_total)}</h6>
            <div>
              <Button disabled={cart.qty < 2} size="sm" variant={cart.qty < 2 ? "secondary" : "primary"} onClick={handleRemoveItemCart}>
                <i className="bi bi-dash"></i>
              </Button>
              <span className="mx-2 fw-semibold">{cart.qty}</span>
              <Button size="sm" variant="primary" onClick={handleAddItemCart}>
                <i className="bi bi-plus"></i>
              </Button>
              <Button disabled={storeCarts.dataCart.length < 2} size="sm" variant="danger" className="ms-2" onClick={handleDeleteByIndex}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </>
        ) : (
          <>
            <span className="mx-2 fw-bold">{cart.qty}x</span>
            <h6 className="me-2  fw-bold">{FormatCurrency(cart.sub_total)}</h6>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CartsListItem;
