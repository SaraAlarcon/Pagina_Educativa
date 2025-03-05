import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Encabezado */}
      <Navbar expand="lg" className="home-header">
        <Container>
          <Navbar.Brand className="home-logo">CodeCampus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto home-nav">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            </Nav>
            <Button as={Link} to="/login" className="login-button">
              Iniciar Sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sección de presentación */}
      <Container className="home-presentation">
        <h1>Aprende Codigo de forma divertida</h1>
        <p>
        CodeCampus es una plataforma interactiva diseñada para enseñar Programación Orientada a Objetos a estudiantes mediante cursos, ejercicios prácticos y proyectos dinámicos.
        </p>
        <Button as={Link} to="/login" className="cta-button">
          ¡Empieza ahora!
        </Button>
      </Container>

      {/* Footer */}
      <footer className="home-footer">
        <Container>
          <p>© 2025 CodeCampus. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
