"use client"

import { useState } from "react"
import { Container, Col, Row, Card, Button, Modal, Form, ProgressBar } from "react-bootstrap"
import {FaClipboardList,FaCalendarAlt,FaFileAlt,FaDownload,FaUpload,FaExclamationCircle,FaFilePdf,FaFileWord,FaFileArchive,FaTimesCircle,FaCheckCircle, FaInfoCircle,FaArrowLeft,} from "react-icons/fa"
import NavbarAlumno from "../../components/alumnoNavbar"
import SidebarAlumno from "../../components/alumnoSidebar"
import "../../styles/AlumnoStyle/ActvEstudiante.css"

const ActividadesEstudiante = () => {
  const [actividades] = useState([
    {
      id: 1,
      titulo: "Taller 1 - Clases y Objetos",
      descripcion:
        "Crear una clase Persona con atributos y métodos. Implementar métodos para calcular la edad, validar información y mostrar datos completos. Crear una aplicación de prueba que demuestre todas las funcionalidades.",
      fechaEntrega: "20/05/2023",
      archivo: "Taller_1_POO.pdf",
      tipo: "pdf",
      entregado: false,
      profesor: "Dr. Martínez",
    },
    {
      id: 2,
      titulo: "Ejercicio - Herencia y Polimorfismo",
      descripcion:
        "Implementar una jerarquía de clases para un sistema de gestión de empleados. Utilizar herencia para modelar diferentes tipos de empleados y polimorfismo para calcular salarios.",
      fechaEntrega: "25/05/2023",
      archivo: "Ejercicio_Herencia.docx",
      tipo: "doc",
      entregado: false,
      profesor: "Dr. Martínez",

    },
  ])

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null)
  const [showDetalleActividad, setShowDetalleActividad] = useState(false)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null)
  const [comentarioEntrega, setComentarioEntrega] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showConfirmacion, setShowConfirmacion] = useState(false)

  const handleVerActividad = (actividad) => {
    setActividadSeleccionada(actividad)
    setShowDetalleActividad(true)
    setArchivoSeleccionado(null)
    setComentarioEntrega("")
  }

  const handleCloseDetalle = () => {
    setShowDetalleActividad(false)
    setActividadSeleccionada(null)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSeleccionado(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setArchivoSeleccionado(null)
  }

  const handleSubmitActividad = () => {
    setUploading(true)

    // Simulación de carga
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        setShowConfirmacion(true)
      }
    }, 300)
  }

  const handleConfirmacionClose = () => {
    setShowConfirmacion(false)
    setShowDetalleActividad(false)
    setActividadSeleccionada(null)
  }

  const getFileIcon = (tipo) => {
    switch (tipo) {
      case "pdf":
        return <FaFilePdf className="file-icon pdf" />
      case "doc":
      case "docx":
        return <FaFileWord className="file-icon doc" />
      case "zip":
      case "rar":
        return <FaFileArchive className="file-icon zip" />
      default:
        return <FaFileAlt className="file-icon" />
    }
  }


  const getFileTypeFromName = (fileName) => {
    if (!fileName) return null
    const extension = fileName.split(".").pop().toLowerCase()

    if (extension === "pdf") return "pdf"
    if (["doc", "docx"].includes(extension)) return "doc"
    if (["zip", "rar"].includes(extension)) return "zip"
    return "file"
  }

  return (
    <div className="est-act-page">
      <NavbarAlumno />
      <Container fluid className="est-act-container">
        <div className="est-act-wrapper">
          {/* Sidebar Izquierdo */}
          <Col md={3} className="est-act-sidebar-col">
            <SidebarAlumno />
          </Col>

          {/* Sección central - Actividades */}
          <Col md={9} className="est-act-main-col">
            <div className="est-act-content">
              <div className="est-act-header">
                <h2>
                  <FaClipboardList className="est-act-header-icon" /> Mis Actividades
                </h2>
                <p>Gestiona tus tareas y evaluaciones pendientes</p>
              </div>

              <div className="est-act-list">
                {actividades.map((actividad) => (
                  <Card key={actividad.id} className="est-act-card">
                    <Card.Body>
                      <div className="est-act-card-header">
                        <div className="est-act-title-section">
                          <h3>{actividad.titulo}</h3>
                          <div className="est-act-meta">
                            <span className="est-act-curso">{actividad.curso}</span>
                            <span className="est-act-fecha">
                              <FaCalendarAlt /> Entrega: {actividad.fechaEntrega}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="est-act-card-body">
                        <p className="est-act-descripcion">{actividad.descripcion}</p>

                        {actividad.calificacion && (
                          <div className="est-act-calificacion">
                            <h4>Calificación:</h4>
                            <span className="est-act-calif-valor">{actividad.calificacion}</span>
                          </div>
                        )}

                        <div className="est-act-footer">
                          <div className="est-act-puntaje">
                            <FaInfoCircle /> Puntaje: {actividad.puntaje || "N/A"}
                          </div>
                          <Button className="est-act-btn-ver" onClick={() => handleVerActividad(actividad)}>
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                    </Card>
                ))}
              </div>
            </div>
          </Col>
        </div>
      </Container>

      {/* Modal de Detalle de Actividad */}
      <Modal
        show={showDetalleActividad}
        onHide={handleCloseDetalle}
        size="lg"
        centered
        className="est-act-detalle-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="est-act-modal-title-container">
              <Button variant="link" className="est-act-back-button" onClick={handleCloseDetalle}>
                <FaArrowLeft />
              </Button>
              <div className="est-act-modal-title-text">
                {actividadSeleccionada?.titulo}
                <div className="est-act-modal-subtitle">
                  {actividadSeleccionada?.curso} - {actividadSeleccionada?.profesor}
                </div>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actividadSeleccionada && (
            <div className="est-act-detalle">
              <div className="est-act-info-section">
                <div className="est-act-info-header">
                  <h4>Información General</h4>
                </div>

                <div className="est-act-info-grid">
                  <div className="est-act-info-item">
                    <span className="est-act-info-label">Fecha de Entrega:</span>
                    <span className="est-act-info-value">{actividadSeleccionada.fechaEntrega}</span>
                  </div>
                  <div className="est-act-info-item">
                    <span className="est-act-info-label">Puntaje:</span>
                    <span className="est-act-info-value">{actividadSeleccionada.puntaje || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="est-act-descripcion-section">
                <h4>Descripción</h4>
                <p>{actividadSeleccionada.descripcion}</p>
              </div>

              {actividadSeleccionada.archivo && (
                <div className="est-act-material-section">
                  <h4>Material de Apoyo</h4>
                  <div className="est-act-material-item">
                    {getFileIcon(actividadSeleccionada.tipo)}
                    <span className="est-act-material-nombre">{actividadSeleccionada.archivo}</span>
                    <Button className="est-act-btn-download">
                      <FaDownload /> Descargar
                    </Button>
                  </div>
                </div>
              )}

              {actividadSeleccionada.calificacion && (
                <div className="est-act-calificacion-section">
                  <h4>Calificación</h4>
                  <div className="est-act-calificacion-container">
                    <div className="est-act-calificacion-valor-grande">{actividadSeleccionada.calificacion}</div>
                    {actividadSeleccionada.retroalimentacion && (
                      <div className="est-act-retroalimentacion-container">
                        <h5>Retroalimentación del profesor:</h5>
                        <p>{actividadSeleccionada.retroalimentacion}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!actividadSeleccionada.entregado && (
                <div className="est-act-entrega-section">
                  <h4>Entregar Actividad</h4>

                  {uploading ? (
                    <div className="est-act-upload-progress-container">
                      <h5>Subiendo archivo...</h5>
                      <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} animated />
                      <p className="est-act-upload-info">Por favor, no cierre esta ventana hasta que la carga se complete.</p>
                    </div>
                  ) : (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Archivo de entrega</Form.Label>
                        {archivoSeleccionado ? (
                          <div className="est-act-selected-file-container">
                            <div className="est-act-selected-file">
                              {getFileIcon(getFileTypeFromName(archivoSeleccionado.name))}
                              <span className="est-act-file-name">{archivoSeleccionado.name}</span>
                              <span className="est-act-file-size">
                                ({(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                              <Button variant="link" className="est-act-remove-file-btn" onClick={handleRemoveFile}>
                                <FaTimesCircle />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="est-act-file-upload-container">
                            <div className="est-act-file-upload-box">
                              <FaUpload className="est-act-upload-icon" />
                              <span>Haz clic aquí para seleccionar un archivo o arrastra y suelta</span>
                              <input type="file" className="est-act-file-input-hidden" onChange={handleFileChange} />
                            </div>
                            <div className="est-act-file-format-info">
                              <FaExclamationCircle /> Formatos aceptados: PDF, DOC, DOCX, ZIP, RAR. Tamaño máximo: 10MB
                            </div>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Comentarios (opcional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Añade comentarios sobre tu entrega..."
                          value={comentarioEntrega}
                          onChange={(e) => setComentarioEntrega(e.target.value)}
                        />
                      </Form.Group>

                      <div className="est-act-entrega-actions">
                        <Button variant="secondary" onClick={handleCloseDetalle} className="est-act-btn-cancelar">
                          Cancelar
                        </Button>
                        <Button className="est-act-btn-entregar" onClick={handleSubmitActividad} disabled={!archivoSeleccionado}>
                          <FaUpload /> Entregar Actividad
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación */}
      <Modal show={showConfirmacion} onHide={handleConfirmacionClose} centered className="est-act-confirmacion-modal">
        <Modal.Body>
          <div className="est-act-confirmacion-content">
            <div className="est-act-confirmacion-icon">
              <FaCheckCircle />
            </div>
            <h3>¡Entrega Exitosa!</h3>
            <p>Tu actividad ha sido entregada correctamente.</p>
            <Button onClick={handleConfirmacionClose} className="est-act-btn-confirmacion">
              Aceptar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ActividadesEstudiante
