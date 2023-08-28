import { Button, Card, Image } from "react-bootstrap";
import formatCurrency from "../../utils/currency"
import { useNavigate } from "react-router-dom";

export default function CardHistory({detail, incomes}) {
  const navigate = useNavigate()
  function handleDetailInvoices (code_invoice) {
    navigate(`/invoice/${code_invoice}`)
  }
  return (
    <>
      <Card className="mb-2">
        <Card.Body className=" d-flex justify-content-between align-items-center">
          <Image 
            src={detail.cart[0].image.url} 
            alt={detail.cart[0].name} 
            style={{ width: "100px", height: "100px", aspectRatio: "3/2", objectFit: "cover" }} 
            />
          <Card.Text className=" m-0 sub__heading__5">Invoices No: #{detail.invoice}</Card.Text>
          <Card.Text className=" m-0 sub__heading__5">{formatCurrency(detail.total)}</Card.Text>

          <Button variant="success" size="sm" onClick={() => handleDetailInvoices(detail.invoice)}>
            <i className="bi bi-eye-fill"></i>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
