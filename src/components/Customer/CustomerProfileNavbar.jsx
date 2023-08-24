import { Container, Navbar } from "react-bootstrap";

function CustomerProfileNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/" className="heading__4 ">
          MARKET.ID
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomerProfileNavbar;
