import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserGraduate, FaChalkboardTeacher, FaUsersCog , FaHome} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/admin.css"; 

const AdminPanel = () => {
  return (
    <div className="admin-page">
      <Container fluid className="content-container">
        <Row>
          <Col md={2} className="admin-sidebar">
            <h4 className="sidebar-title">Admin</h4>
            <ul className="sidebar-menu">
                <li>
                    <a href="/admin" className="sidebar-link">
                    <FaHome /> Dashboard
                    </a>
                </li>
                <li></li>
              <li>
                <Link to="/registro-estudiante" className="sidebar-link">
                  <FaUserGraduate /> Registro Estudiante
                </Link>
              </li>
              <li>
                <Link to="/registro-docente" className="sidebar-link">
                  <FaChalkboardTeacher /> Registro Docente
                </Link>
              </li>
              <li>
                <Link to="/grupos" className="sidebar-link">
                  <FaUsersCog /> Grupos
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={10} className="admin-main-content">
            <div className="welcome-panel">
              <h2>Bienvenido al Panel de Administración</h2>
              <p>Desde aquí puedes gestionar estudiantes, docentes y asignación de grupos.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPanel;
