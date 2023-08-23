import { useNavigate } from "react-router-dom";

import { Container, Button, Navbar, Nav } from "react-bootstrap";

function CartsNavbar() {
  const navigate = useNavigate();

  function handleToProfile() {
    navigate("/profile");
  }
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/" className="heading__4 ">
          MARKET.ID
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="d-flex justify-content-end w-100">
            <Button variant="light" className="fw-bold " onClick={handleToProfile}>
              Profile
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CartsNavbar;
