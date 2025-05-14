"use client"

import { useState } from "react"
import { Container, Col, Row, Button, Form, Card } from "react-bootstrap"
import { FaArrowLeft, FaUpload, FaBook, FaClipboardCheck, FaCalendarAlt, FaUserGraduate, FaDownload, FaPlus, FaFileAlt, FaFilePdf,FaFilePowerpoint, FaFileWord, } from "react-icons/fa"
import CustomNavbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import "../../styles/DocenteStyle/ClaseDetalleDocente.css"
import { useParams } from "react-router-dom"

const ClaseDetalle = () => {
  const { id } = useParams
  const [activeTab, setActiveTab] = useState("sesiones")
  const [showAddSession, setShowAddSession] = useState(false)
  const [newSession, setNewSession] = useState({ title: "", description: "" })

  // Datos de ejemplo
  const claseInfo = {
    id: id,
    titulo: "Programación Orientada a Objetos",
    descripcion: "Fundamentos y aplicaciones prácticas de la POO en Java",
    fecha: "15 de Mayo, 2023",
    estudiantes: 24,
    sesiones: [
      {
        id: 1,
        titulo: "Introducción a la POO",
        descripcion:
          "Se presenta el concepto de clase, objeto, atributos y métodos. Ejemplos prácticos de abstracción y modelado de objetos del mundo real.",
      },
      {
        id: 2,
        titulo: "Encapsulamiento",
        descripcion:
          "Se abordan modificadores de acceso, getters, setters y buenas prácticas de encapsulamiento. Ejercicios prácticos de implementación.",
      },
      {
        id: 3,
        titulo: "Herencia y Polimorfismo",
        descripcion:
          "Conceptos avanzados de herencia, clases abstractas, interfaces y polimorfismo. Desarrollo de jerarquías de clases.",
      },
    ],
    materiales: [
      {
        id: 1,
        nombre: "Guía de POO en Java",
        tipo: "pdf"
      },
      {
        id: 2,
        nombre: "Presentación Clase 1",
        tipo: "ppt",
      },
      {
        id: 3,
        nombre: "Ejercicios Prácticos",
        tipo: "doc"
      },
    ],
    evaluaciones: [
      {
        id: 1,
        titulo: "Quiz de Conceptos Básicos",
        fecha: "20/05/2023",
        estado: "Programado",
      },
      {
        id: 2,
        titulo: "Proyecto: Sistema de Gestión",
        fecha: "10/06/2023",
        estado: "Pendiente",
      },
    ],
  }

  const handleVolver = () => {
    window.location.href = "/clases"
  }

  const handleAddSession = () => {
    setShowAddSession(true)
  }

  const handleSaveSession = () => {
    // Aquí iría la lógica para guardar la nueva sesión
    setShowAddSession(false)
    setNewSession({ title: "", description: "" })
  }

  const getFileIcon = (tipo) => {
    switch (tipo) {
      case "pdf":
        return <FaFilePdf className="material-icon pdf" />
      case "ppt":
        return <FaFilePowerpoint className="material-icon ppt" />
      case "doc":
        return <FaFileWord className="material-icon doc" />
      default:
        return <FaFileAlt className="material-icon" />
    }
  }

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
              {/* Header con información general */}
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
                    <Col md={4}>
                      <div className="info-card">
                        <div className="info-icon">
                          <FaCalendarAlt />
                        </div>
                        <div className="info-content">
                          <h4>Fecha</h4>
                          <p>{claseInfo.fecha}</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="info-card">
                        <div className="info-icon">
                          <FaUserGraduate />
                        </div>
                        <div className="info-content">
                          <h4>Estudiantes</h4>
                          <p>{claseInfo.estudiantes} alumnos</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="info-card">
                        <div className="info-icon">
                          <FaClipboardCheck />
                        </div>
                        <div className="info-content">
                          <h4>Evaluaciones</h4>
                          <p>{claseInfo.evaluaciones.length} programadas</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              {/* Tabs de navegación */}
              <div className="clase-tabs">
                <div
                  className={`tab-item ${activeTab === "sesiones" ? "active" : ""}`}
                  onClick={() => setActiveTab("sesiones")}
                >
                  <FaBook /> Sesiones
                </div>
                <div
                  className={`tab-item ${activeTab === "materiales" ? "active" : ""}`}
                  onClick={() => setActiveTab("materiales")}
                >
                  <FaUpload /> Materiales
                </div>
                <div
                  className={`tab-item ${activeTab === "evaluaciones" ? "active" : ""}`}
                  onClick={() => setActiveTab("evaluaciones")}
                >
                  <FaClipboardCheck /> Evaluaciones
                </div>
              </div>

              {/* Contenido de las tabs */}
              <div className="tab-content">
                {/* Tab de Sesiones */}
                {activeTab === "sesiones" && (
                  <div className="sesiones-container">
                    <div className="section-header">
                      <h3>
                        <FaBook /> Sesiones de Clase
                      </h3>
                      <Button className="btn-add" onClick={handleAddSession}>
                        <FaPlus /> Añadir Sesión
                      </Button>
                    </div>

                    {showAddSession && (
                      <Card className="add-session-form">
                        <Card.Body>
                          <h4>Nueva Sesión</h4>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Título</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Ej: Introducción a la POO"
                                value={newSession.title}
                                onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Descripción</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Describe los temas y objetivos de la sesión"
                                value={newSession.description}
                                onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                              />
                            </Form.Group>
                            <div className="form-actions">
                              <Button variant="outline-secondary" onClick={() => setShowAddSession(false)}>
                                Cancelar
                              </Button>
                              <Button className="btn-save" onClick={handleSaveSession}>
                                Guardar Sesión
                              </Button>
                            </div>
                          </Form>
                        </Card.Body>
                      </Card>
                    )}

                    <div className="sesiones-list">
                      {claseInfo.sesiones.map((sesion) => (
                        <div key={sesion.id} className="sesion-card">
                          <div className="sesion-number">{sesion.id}</div>
                          <div className="sesion-content">
                            <h4>{sesion.titulo}</h4>
                            <p>{sesion.descripcion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab de Materiales */}
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
                        <Form.Control type="file" multiple className="file-input" />
                        <Button className="btn-browse">Seleccionar Archivos</Button>
                      </Form.Group>
                      <p className="upload-note">Formatos soportados: PDF, PPT, DOC, DOCX, XLS, XLSX, JPG, PNG</p>
                    </div>

                    <div className="materiales-list">
                      <h4>Materiales Disponibles</h4>
                      <div className="material-items">
                        {claseInfo.materiales.map((material) => (
                          <div key={material.id} className="material-card">
                            {getFileIcon(material.tipo)}
                            <div className="material-info">
                              <h5>{material.nombre}</h5>
                              <p>
                                {material.tipo.toUpperCase()}
                              </p>
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

                {/* Tab de Evaluaciones */}
                {activeTab === "evaluaciones" && (
                  <div className="evaluaciones-container">
                    <div className="section-header">
                      <h3>
                        <FaClipboardCheck /> Evaluaciones
                      </h3>
                      <Button className="btn-add">
                        <FaPlus /> Crear Evaluación
                      </Button>
                    </div>

                    {claseInfo.evaluaciones.length > 0 ? (
                      <div className="evaluaciones-list">
                        {claseInfo.evaluaciones.map((evaluacion) => (
                          <div key={evaluacion.id} className="evaluacion-card">
                            <div className="evaluacion-content">
                              <h4>{evaluacion.titulo}</h4>
                              <div className="evaluacion-meta">
                                <span className="evaluacion-fecha">
                                  <FaCalendarAlt /> {evaluacion.fecha}
                                </span>
                                <span className={`evaluacion-estado ${evaluacion.estado.toLowerCase()}`}>
                                  {evaluacion.estado}
                                </span>
                              </div>
                            </div>
                            <div className="evaluacion-actions">
                              <Button className="btn-edit">Editar</Button>
                              <Button className="btn-view">Ver Detalles</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h4>No hay evaluaciones programadas</h4>
                        <p>Crea tu primera evaluación para esta clase</p>
                      </div>
                    )}
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
