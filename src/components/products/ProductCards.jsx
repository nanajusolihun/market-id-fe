import React from "react";
import { Button, Card } from "react-bootstrap";
import defaultIMG from "../../assets/images/defaultImage.png";
import FormatCurrency from "../../utils/currency";

const ProductCards = (props) => {
  const { product } = props;
  return (
    <Card className=" w-100 mx-2">
      <Card.Img
        variant="top"
        src={product.image ? product.image.url : defaultIMG}
        // Membantu tuna rungu atau tuan netra
        alt={`product-${product.name}`}
        className=" object-fit-contain mb-1"
        height="235"
      />
      <Card.Body>
        <Card.Subtitle className="sub__heading__4 ">{product.name}</Card.Subtitle>
        <Card.Text className="text__3 my-2 ">{product.category.name}</Card.Text>
        <Card.Title className="sub__heading__1 my-2">{FormatCurrency(product.price)}</Card.Title>

        <Button variant="outline-primary" className="w-100">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCards;
