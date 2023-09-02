import React from "react";
import defaultIMG from "../../assets/images/defaultImage.png";
import FormatCurrency from "../../utils/currency";
import { Button, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

const ProductCards = (props) => {
  const { product } = props;

  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let dataCart = storeCarts.dataCart;

    const findProductById = dataCart.find((item) => item._id === product._id);

    if (!findProductById) {
      dataCart.push({ ...product, qty: 1, sub_total: product.price * 1 });
      dispatch({ type: "SET_CARTS", value: dataCart });
    }

    if (findProductById) {
      dataCart.forEach((item) => {
        if (item._id === product._id) {
          item.qty += 1;
          item.sub_total = item.qty * item.price;
        }
      });
      dispatch({ type: "SET_CARTS", value: dataCart });
    }
  };

  return (
    <>
      <Card className=" w-100 h-100">
        <Card.Img
          variant="top"
          src={product.image ? product.image.url : defaultIMG}
          // Membantu tuna rungu atau tuan netra
          alt={`product-${product.name}`}
          className=" object-fit-cover mb-1"
          height="200"
        />
        <Card.Body>
          <Card.Subtitle className="sub__heading__4 ">{product.name}</Card.Subtitle>
          <Card.Text className="text__3 my-2 ">{product.category.name}</Card.Text>
          <Card.Title className="sub__heading__1 my-2">{FormatCurrency(product.price)}</Card.Title>

          <Button type="button" variant="outline-primary" className="w-100" onClick={() => handleAddToCart()}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCards;
