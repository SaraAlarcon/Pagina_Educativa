"use client"

import { useState } from "react"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faBars, faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import "../stylescomponents/navbar.css"

const NavbarAlumno = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top" expanded={expanded}>
      <Container fluid className="navbar-container">
        <Navbar.Brand href="#" className="brand">
          <div className="logo-container">
            <img src="/images/white.png" alt="Logo" className="logo-image" />
            <span className="logo-text">CodeCampus</span>
          </div>
        </Navbar.Brand>

        <div className="search-container d-none d-md-flex">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input type="text" placeholder="Buscar..." className="search-input" />
          </div>
        </div>

        <Navbar.Toggle aria-controls="navbarNav" onClick={() => setExpanded(!expanded)}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto nav-links">
            <Nav.Link href="/alumno" className="nav-item">
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
            </Nav.Link>

            <Nav.Link href="/chats-estudiante" className="nav-item">
              <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
            </Nav.Link>

            <NavDropdown
              title={
                <div className="profile-container">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                    className="profile-img"
                    alt="Profile"
                  />
                </div>
              }
              id="navbarDropdown"
              className="profile-dropdown"
            >
              <NavDropdown.Item href="#">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarAlumno

