import React from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";
// Importa íconos si vas a usarlos
import { FaLaptopCode, FaUsers, FaBook, FaRocket } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Encabezado con Gradient */}
      <Navbar expand="lg" className="navbar-gradient">
        <Container>
          <Navbar.Brand className="home-logo">
            <span className="logo-text">CodeCampus</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-links">
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

      {/* Hero Section con Gradient */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center hero-content">
            <Col lg={6} md={12} className="hero-text">
              <h1 className="main-heading">Aprende Código de forma <span className="highlight-text">divertida</span></h1>
              <p className="hero-description">
                CodeCampus es una plataforma interactiva diseñada para enseñar Programación 
                Orientada a Objetos a estudiantes mediante cursos, ejercicios prácticos 
                y proyectos dinámicos.
              </p>
              <Button as={Link} to="/login" className="cta-button">
                ¡Empieza ahora!
              </Button>
            </Col>
            <Col lg={6} md={10} className="code-illustration">
              {<img src="/images/symbol.png" alt="Logo" className="illustration-icon" />}
  
            </Col>
          </Row>
        </Container>
      </div>

      {/* Características */}
      <section className="features-section">
        <Container>
          <h2 className="section-title">¿Por qué elegir CodeCampus?</h2>
          <Row>
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FaBook />
              </div>
              <h3>Cursos Interactivos</h3>
              <p>Aprende con lecciones prácticas diseñadas por expertos en programación.</p>
            </Col>
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Comunidad Activa</h3>
              <p>Conéctate con otros estudiantes y colabora en proyectos reales.</p>
            </Col>
            <Col md={4} className="feature-card">
              <div className="feature-icon">
                <FaRocket />
              </div>
              <h3>Proyectos Dinámicos</h3>
              <p>Aplica lo aprendido en proyectos prácticos que potencian tu portafolio.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer con Gradient */}
      <footer className="footer-gradient">
        <Container>
          <Row>
            <Col md={6}>
              <div className="footer-logo">
              {
                <img src="/images/logo-white.png" alt="Logo" className="footer-logo" />
              }
          </div>
              
              <p>Tu plataforma para dominar la programación de manera divertida y efectiva.</p>
            </Col>
            <Col md={6} className="footer-links">
              <Row>
                <Col sm={6}>
                  <h5>Enlaces</h5>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">Sobre Nosotros</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                  </ul>
                </Col>
                <Col sm={6}>
                  <h5>Recursos</h5>
                  <ul>
                    <li><Link to="/courses">Cursos</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr className="footer-divider" />
          <p className="copyright">© 2025 CodeCampus. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
