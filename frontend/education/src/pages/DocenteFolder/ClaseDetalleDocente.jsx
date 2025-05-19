import { useState } from "react"
import { Container, Col, Row, Button, Form, Card } from "react-bootstrap"
import { FaArrowLeft, FaUpload, FaDownload, FaPlus, FaFileAlt, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa"
import CustomNavbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import { useParams } from "react-router-dom"
import "../../styles/DocenteStyle/ClaseDetalleDocente.css"

const ClaseDetalle = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("materiales")
  const [materialesSubidos, setMaterialesSubidos] = useState([])

  const claseInfo = {
    id: id,
    titulo: "Programación Orientada a Objetos",
    descripcion: "Fundamentos y aplicaciones prácticas de la POO en Java",
    fecha: "15 de Mayo, 2023",
    estudiantes: 24,
    materiales: [
      { id: 1, nombre: "Guía de POO en Java", tipo: "pdf" },
      { id: 2, nombre: "Presentación Clase 1", tipo: "ppt" },
      { id: 3, nombre: "Ejercicios Prácticos", tipo: "doc" },
    ],
  }

  const handleVolver = () => {
    window.location.href = "/clases"
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const nuevosArchivos = files.map((file, index) => {
      const extension = file.name.split(".").pop().toLowerCase()
      return {
        id: Date.now() + index,
        nombre: file.name,
        tipo: extension,
      }
    })
    setMaterialesSubidos([...materialesSubidos, ...nuevosArchivos])
    e.target.value = null
  }

  const materialesTotales = [...claseInfo.materiales, ...materialesSubidos]

  return (
    <div className="clases-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          <Col md={2} className="sidebar-left-col">
            <Sidebar />
          </Col>

          <Col md={10} className="clases-section-col">
            <div className="clases-content">
              <div className="clase-hero">
                <div className="hero-content">
                  <div className="hero-text">
                    <h1>{claseInfo.titulo}</h1>
                    <p>{claseInfo.descripcion}</p>
                  </div>
                  <Button onClick={handleVolver} className="btn-volver">
                    <FaArrowLeft /> Volver
                  </Button>
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
                          <FaUpload />
                        </div>
                        <div className="info-content">
                          <h4>Estudiantes</h4>
                          <p>{claseInfo.estudiantes} alumnos</p>
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
                      <Button className="btn-add">
                        <FaPlus /> Subir Material
                      </Button>
                    </div>

                    <div className="upload-area">
                      <div className="upload-icon">
                        <FaUpload />
                      </div>
                      <h4>Arrastra y suelta archivos aquí</h4>
                      <p>o</p>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                          type="file"
                          multiple
                          className="file-input"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                          id="fileUploadInput"
                        />
                        <Button
                          className="btn-browse"
                          onClick={() => document.getElementById("fileUploadInput").click()}
                        >
                          Seleccionar Archivos
                        </Button>
                      </Form.Group>
                      <p className="upload-note">Formatos soportados: PDF, PPT, DOC, DOCX, JPG, PNG</p>
                    </div>

                    <div className="materiales-list">
                      <h4>Materiales Disponibles</h4>
                      <div className="material-items">
                        {materialesTotales.map((material) => (
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

export default ClaseDetalle
