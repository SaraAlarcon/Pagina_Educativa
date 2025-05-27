import { useState } from "react"
import { Container, Col, Row, Button } from "react-bootstrap"
import { FaArrowLeft, FaDownload, FaUpload, FaFileAlt, FaFilePdf, FaFilePowerpoint, FaFileWord, FaFileCode } from "react-icons/fa"
import NavbarAlumno from "../../components/alumnoNavbar"
import SidebarAlumno from "../../components/alumnoSidebar"
import { useParams } from "react-router-dom"
import "../../styles/DocenteStyle/ClaseDetalleDocente.css"

const ClaseDetalleEstudiante = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("materiales")

  const claseInfo = {
    id: id,
    titulo: "CodeCampus: Programación Orientada a Objetos",
    descripcion: "Fundamentos y aplicaciones prácticas de la POO",
    fecha: "15 de Mayo, 2023",
    materiales: [
      { id: 1, nombre: "Guía de POO", tipo: "pdf" },
      { id: 2, nombre: "Presentación Clase 1", tipo: "ppt" },
      { id: 3, nombre: "Ejercicios Prácticos", tipo: "doc" },
    ],
  }

  const handleVolver = () => {
    window.location.href = "/clases-estudiante"
  }

  const getFileIcon = (tipo) => {
    switch (tipo) {
      case "pdf": return <FaFilePdf className="material-icon pdf" />
      case "ppt": return <FaFilePowerpoint className="material-icon ppt" />
      case "doc":
      case "docx": return <FaFileWord className="material-icon doc" />
      default: return <FaFileAlt className="material-icon" />
    }
  }

  return (
    <div className="clases-page">
      <NavbarAlumno />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          <Col md={2} className="sidebar-left-col">
            <SidebarAlumno />
          </Col>

          <Col md={10} className="clases-section-col">
            <div className="clases-content">
              <div className="clase-hero">
                <div className="hero-content">
                  <div className="hero-text">
                    <h1>{claseInfo.titulo}</h1>
                    <p>{claseInfo.descripcion}</p>
                  </div>
                </div>
                <div className="clase-info-cards">
                  <Row>
                    <Col md={6}>
                      <div className="info-card">
                        <div className="info-icon">
                          <FaUpload />
                        </div>
                        <div className="info-content">
                          <h4>Fecha</h4>
                          <p>{claseInfo.fecha}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="info-card">
                        <div className="info-icon">
                          <FaFileCode />
                        </div>
                        <div className="info-content">
                          <h4>Bienvenido</h4>
                          <p> Estudiante</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className="clase-tabs">
                <div
                  className={`tab-item ${activeTab === "materiales" ? "active" : ""}`}
                  onClick={() => setActiveTab("materiales")}
                >
                  <FaUpload /> Materiales
                </div>
              </div>

              <div className="tab-content">
                {activeTab === "materiales" && (
                  <div className="materiales-container">
                    <div className="section-header">
                      <h3>
                        <FaUpload /> Materiales de Estudio
                      </h3>
                    </div>

                    <div className="materiales-list">
                      <h4>Materiales Disponibles</h4>
                      <div className="material-items">
                        {claseInfo.materiales.map((material) => (
                          <div key={material.id} className="material-card">
                            {getFileIcon(material.tipo)}
                            <div className="material-info">
                              <h5>{material.nombre}</h5>
                              <p>{material.tipo.toUpperCase()}</p>
                            </div>
                            <Button className="btn-download">
                              <FaDownload />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default ClaseDetalleEstudiante
