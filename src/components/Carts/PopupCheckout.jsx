import { Modal, Button } from "react-bootstrap";

export default function PopupCheckout(props) {
  const { show, handleCancel, handlePayment } = props;
  return (
    <Modal centered size="md" show={show} onHide={handleCancel} className="p-1 d-flex justify-content-center align-items-center">
      <Modal.Title className="text-center p-3 fw-bold">INFORMATION !</Modal.Title>

      <Modal.Body className="text-center p-3 fw-normal">Please make this payment via bank transfer or digital wallet by sending valid proof of transfer.</Modal.Body>
      <Modal.Body className="p-3 d-flex justify-content-center align-items-center">
        <Button variant="danger" className="mx-5" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="success" className="mx-5" onClick={handlePayment}>
          Pay Now
        </Button>
      </Modal.Body>
    </Modal>
  );
}
