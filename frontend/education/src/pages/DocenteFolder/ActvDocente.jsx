"use client"

import { useState } from "react"
import { Container, Col, Button, Form, Modal } from "react-bootstrap"
import {
  FaClipboardList,
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaBook,
  FaEdit,
  FaTrash,
  FaFileAlt,
  FaUpload,
} from "react-icons/fa"
import Sidebar from "../../components/sidebar"
import CustomNavbar from "../../components/navbar"
import "../../styles/DocenteStyle/ActvDocente.css"

const ActividadesDocente = () => {
  const clases = [
    { id: 1, nombre: "Grupo: A", color: "#00a9f4" },
    { id: 2, nombre: "Grupo: B", color: "#00eca4" },
    { id: 3, nombre: "Grupo: C", color: "#9c27b0" },
  ]

  const [claseSeleccionada, setClaseSeleccionada] = useState(clases[0].id)
  const [actividades, setActividades] = useState({
    1: [
      {
        id: 1,
        titulo: "Taller 1 - Clases y Objetos",
        descripcion: "Crear una clase Persona con atributos y métodos.",
        fechaCreacion: "10/05/2023",
        fechaEntrega: "20/05/2023",
        estado: "Activa",
        entregas: 12,
      },
      {
        id: 2,
        titulo: "Ejercicio - Herencia y Polimorfismo",
        descripcion: "Implementar una jerarquía de clases para un sistema de gestión de empleados.",
        fechaCreacion: "15/05/2023",
        fechaEntrega: "25/05/2023",
        estado: "Activa",
        entregas: 8,
      },
    ],
    2: [
      {
        id: 1,
        titulo: "Implementación de Listas Enlazadas",
        descripcion: "Crear una implementación de lista enlazada simple en Java.",
        fechaCreacion: "05/05/2023",
        fechaEntrega: "15/05/2023",
        estado: "Finalizada",
        entregas: 15,
      },
    ],
    3: [
      {
        id: 1,
        titulo: "Diseño de Esquema Relacional",
        descripcion: "Crear un esquema relacional para un sistema de gestión de biblioteca.",
        fechaCreacion: "12/05/2023",
        fechaEntrega: "22/05/2023",
        estado: "Activa",
        entregas: 10,
      },
    ],
  })
  const [nuevaActividad, setNuevaActividad] = useState({
    titulo: "",
    descripcion: "",
    fechaEntrega: "",
    archivo: null,
  })
  const [searchTerm, setSearchTerm] = useState("")

  // Agregar estos estados para los modales y la actividad seleccionada
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)

  // Modificar la función handleCrearActividad para asegurar que todas las clases tengan un array de actividades
  const handleCrearActividad = () => {
    if (!nuevaActividad.titulo.trim()) return

    const nuevas = actividades[claseSeleccionada] || []
    const nueva = {
      id: nuevas.length + 1,
      titulo: nuevaActividad.titulo,
      descripcion: nuevaActividad.descripcion,
      fechaCreacion: new Date().toLocaleDateString(),
      fechaEntrega: nuevaActividad.fechaEntrega || "No especificada",
      estado: "Activa",
      entregas: 0,
    }

    // Asegurarse de que todas las clases tengan un array de actividades
    const updatedActividades = { ...actividades }
    Object.keys(clases).forEach((id) => {
      if (!updatedActividades[id]) {
        updatedActividades[id] = []
      }
    })

    updatedActividades[claseSeleccionada] = [...nuevas, nueva]
    setActividades(updatedActividades)
    setNuevaActividad({ titulo: "", descripcion: "", fechaEntrega: "", archivo: null })
  }

  // Agregar estas funciones para manejar la edición y eliminación
  const handleEditClick = (actividad, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedActivity(actividad)
    setNuevaActividad({
      titulo: actividad.titulo,
      descripcion: actividad.descripcion,
      fechaEntrega: actividad.fechaEntrega,
      archivo: null,
    })
    setShowEditModal(true)
  }

  const handleDeleteClick = (actividad, e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedActivity(actividad)
    setShowDeleteModal(true)
  }

  const handleEditActivity = () => {
    if (!nuevaActividad.titulo.trim()) return

    const updatedActividades = { ...actividades }
    updatedActividades[claseSeleccionada] = actividades[claseSeleccionada].map((act) =>
      act.id === selectedActivity.id
        ? {
            ...act,
            titulo: nuevaActividad.titulo,
            descripcion: nuevaActividad.descripcion,
            fechaEntrega: nuevaActividad.fechaEntrega || act.fechaEntrega,
          }
        : act,
    )

    setActividades(updatedActividades)
    setShowEditModal(false)
    setNuevaActividad({ titulo: "", descripcion: "", fechaEntrega: "", archivo: null })
  }

  const handleDeleteActivity = () => {
    const updatedActividades = { ...actividades }
    updatedActividades[claseSeleccionada] = actividades[claseSeleccionada].filter(
      (act) => act.id !== selectedActivity.id,
    )

    setActividades(updatedActividades)
    setShowDeleteModal(false)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNuevaActividad({
        ...nuevaActividad,
        archivo: e.target.files[0],
      })
    }
  }

  const filteredActividades = actividades[claseSeleccionada]?.filter(
    (act) =>
      act.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "activa":
        return "estado-activa"
      case "finalizada":
        return "estado-finalizada"
      case "pendiente":
        return "estado-pendiente"
      default:
        return ""
    }
  }

  return (
    <div className="actividades-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          <Col md={2} className="sidebar-left-col">
            <Sidebar />
          </Col>

          <Col md={10} className="actividades-section-col">
            <div className="actividades-content">
              <div className="actividades-header">
                <div className="actividades-title">
                  <h2>
                    <FaClipboardList className="title-icon" /> Actividades
                  </h2>
                  <p>Gestiona las actividades para tus clases</p>
                </div>
                <div className="actividades-actions">
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar actividades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              <div className="clase-selector-container">
                <div className="clase-selector-label">Seleccionar Clase:</div>
                <div className="clase-selector-buttons">
                  {clases.map((clase) => (
                    <button
                      key={clase.id}
                      className={`clase-selector-btn ${claseSeleccionada === clase.id ? "active" : ""}`}
                      style={{
                        "--clase-color": clase.color,
                      }}
                      onClick={() => setClaseSeleccionada(clase.id)}
                    >
                      <FaBook className="clase-icon" />
                      <span>{clase.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="actividades-grid">
                <div className="crear-actividad-card">
                  <div className="card-header">
                    <h3>
                      <FaPlus className="card-icon" /> Crear Nueva Actividad
                    </h3>
                  </div>
                  <div className="card-body">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Título de la actividad</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: Taller sobre Herencia"
                          value={nuevaActividad.titulo}
                          onChange={(e) => setNuevaActividad({ ...nuevaActividad, titulo: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Detalles de la actividad..."
                          value={nuevaActividad.descripcion}
                          onChange={(e) => setNuevaActividad({ ...nuevaActividad, descripcion: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de entrega</Form.Label>
                        <Form.Control
                          type="date"
                          value={nuevaActividad.fechaEntrega}
                          onChange={(e) => setNuevaActividad({ ...nuevaActividad, fechaEntrega: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Archivo (opcional)</Form.Label>
                        <div className="file-upload-container">
                          <div className="file-upload-box">
                            <FaUpload className="upload-icon" />
                            <span>{nuevaActividad.archivo ? nuevaActividad.archivo.name : "Seleccionar archivo"}</span>
                            <Form.Control
                              type="file"
                              className="file-input-hidden"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.ppt,.pptx"
                            />
                          </div>
                          <div className="file-format-hint">Formatos: PDF, DOC, DOCX, PPT, PPTX</div>
                        </div>
                      </Form.Group>
                      <Button className="crear-btn" onClick={handleCrearActividad}>
                        <FaPlus /> Crear Actividad
                      </Button>
                    </Form>
                  </div>
                </div>

                <div className="actividades-list-container">
                  <div className="list-header">
                    <h3>
                      <FaClipboardList className="list-icon" /> Actividades para "
                      {clases.find((c) => c.id === claseSeleccionada)?.nombre}"
                    </h3>
                  </div>

                  {filteredActividades && filteredActividades.length > 0 ? (
                    <div className="actividades-list">
                      {filteredActividades.map((act) => (
                        <div key={act.id} className="actividad-card">
                          <div className="actividad-header">
                            <h4>{act.titulo}</h4>
                            <div className={`actividad-estado ${getEstadoClass(act.estado)}`}>{act.estado}</div>
                          </div>
                          <p className="actividad-descripcion">{act.descripcion}</p>
                          <div className="actividad-footer">
                            <div className="actividad-meta">
                              <div className="meta-item">
                                <FaCalendarAlt className="meta-icon" />
                                <span>Entrega: {act.fechaEntrega}</span>
                              </div>
                              <div className="meta-item">
                                <FaFileAlt className="meta-icon" />
                                <span>{act.entregas} entregas</span>
                              </div>
                            </div>
                            <div className="actividad-actions">
                              <Button className="action-btn edit" onClick={(e) => handleEditClick(act, e)}>
                                <FaEdit />
                              </Button>
                              <Button className="action-btn delete" onClick={(e) => handleDeleteClick(act, e)}>
                                <FaTrash />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-actividades">
                      <div className="empty-icon">📋</div>
                      <h3>No hay actividades</h3>
                      <p>No se encontraron actividades para esta clase. Crea una nueva actividad para comenzar.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Container>
      {/* Modal para editar actividad */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título de la actividad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Taller sobre Herencia"
                value={nuevaActividad.titulo}
                onChange={(e) => setNuevaActividad({ ...nuevaActividad, titulo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Detalles de la actividad..."
                value={nuevaActividad.descripcion}
                onChange={(e) => setNuevaActividad({ ...nuevaActividad, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de entrega</Form.Label>
              <Form.Control
                type="date"
                value={nuevaActividad.fechaEntrega}
                onChange={(e) => setNuevaActividad({ ...nuevaActividad, fechaEntrega: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditActivity}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la actividad "{selectedActivity?.titulo}"?</p>
          <p className="text-danger">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteActivity}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ActividadesDocente
