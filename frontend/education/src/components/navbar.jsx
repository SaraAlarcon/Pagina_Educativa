import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../stylescomponents/navbar.css";

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand href="#">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNav"
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="text-center">
              <FontAwesomeIcon icon={faHome} size="lg" className="my-2" />
              <div className="small">Inicio</div>
            </Nav.Link>
            <NavDropdown
              title={
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                  className="rounded-circle profile-img"
                  alt="Profile"
                />
              }
              id="navbarDropdown"
            >
              <NavDropdown.Item href="#">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#">Configuración</NavDropdown.Item>
              <NavDropdown.Item href="#">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
