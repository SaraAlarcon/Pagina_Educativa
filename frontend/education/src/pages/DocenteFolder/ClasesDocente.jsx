"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import {FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaClock, FaUsers, FaBook, FaSave, FaTimes ,FaChalkboardTeacher, } from "react-icons/fa"
import CustomNavbar from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import "../../styles/DocenteStyle/ClasesDocente.css"

const ClasesPage = () => {
  // Estados para manejar las clases y modales
  const [clases, setClases] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentClase, setCurrentClase] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: ""
  })

  // Datos de ejemplo para clases - IMPORTANTE: ID como string para que coincida con el parámetro de la URL
  useEffect(() => {
    // Simulación de carga de datos desde una API
    const clasesEjemplo = [
      {
        id: "4", // Cambiado a string para que coincida con el parámetro de la URL
        nombre: "Grupo A",
        descripcion: "Desarrollo de aplicaciones web con React y Node.js",
        fecha: "2023-05-18",
        color: "#ff9800",
      },
    ]

    setClases(clasesEjemplo)
  }, [])

  // Filtrar clases según la búsqueda
  const filteredClases = clases.filter(
    (clase) =>
      clase.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Manejadores para los modales
  const handleOpenCreateModal = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      fecha: ""
    })
    setShowCreateModal(true)
  }

  const handleOpenEditModal = (clase, e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentClase(clase)
    setFormData({
      nombre: clase.nombre,
      descripcion: clase.descripcion,
      fecha: clase.fecha
    })
    setShowEditModal(true)
  }
 
  const handleOpenDeleteModal = (clase, e) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentClase(clase)
    setShowDeleteModal(true)
  }

  // Manejadores para los formularios
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCreateClase = () => {
    // Generar un color aleatorio para la nueva clase
    const colors = ["#00a9f4", "#00eca4", "#9c27b0", "#ff9800", "#e91e63", "#4caf50"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    // Generar un ID único como string
    const newId = (clases.length + 1).toString()

    const newClase = {
      id: newId,
      ...formData,
      estudiantes: Number.parseInt(formData.estudiantes) || 0,
      color: randomColor,
    }

    setClases([...clases, newClase])
    setShowCreateModal(false)
  }

  const handleEditClase = () => {
    const updatedClases = clases.map((clase) => {
      if (clase.id === currentClase.id) {
        return {
          ...clase,
          ...formData,
          estudiantes: Number.parseInt(formData.estudiantes) || 0,
        }
      }
      return clase
    })

    setClases(updatedClases)
    setShowEditModal(false)
  }

  const handleDeleteClase = () => {
    const updatedClases = clases.filter((clase) => clase.id !== currentClase.id)
    setClases(updatedClases)
    setShowDeleteModal(false)
  }

  // Función para navegar a la página de detalles
  const navigateToClaseDetail = (claseId) => {
    window.location.href = `/clases/${claseId}`
  }

  return (
    <div className="clases-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          {/* Sidebar Izquierdo */}
          <Col md={2} className="sidebar-left-col">
            <Sidebar />
          </Col>

          {/* Sección central - Clases */}
          <Col md={10} className="clases-section-col">
            <div className="clases-content">
              <div className="clases-header">
                <div className="clases-title">
                  <h2>Mis Clases</h2>
                  <p>Gestiona tus clases y horarios académicos</p>
                </div>
                <div className="clases-actions">
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar clases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <Button className="create-btn" onClick={handleOpenCreateModal}>
                    <FaPlus /> Nueva Clase
                  </Button>
                </div>
              </div>

              <div className="clases-list">
                {filteredClases.length > 0 ? (
                  <Row>
                    {filteredClases.map((clase) => (
                      <Col key={clase.id} lg={4} md={6} sm={12} className="clase-col">
                        <div
                          className="clase-card"
                          style={{ borderTopColor: clase.color, cursor: "pointer" }}
                          onClick={() => navigateToClaseDetail(clase.id)}
                        >
                          <div className="clase-header">
                            <div
                              className="clase-icon"
                              style={{ background: `linear-gradient(135deg, ${clase.color}, ${clase.color}CC)` }}
                            >
                              <FaChalkboardTeacher />
                            </div>
                            <div className="clase-actions">
                              <Button
                                variant="link"
                                className="edit-btn"
                                onClick={(e) => handleOpenEditModal(clase, e)}
                              >
                                <FaEdit size={16} />
                              </Button>
                              <Button
                                variant="link"
                                className="delete-btn"
                                onClick={(e) => handleOpenDeleteModal(clase, e)}
                              >
                                <FaTrash size={16} />
                              </Button>
                            </div>
                          </div>
                          <div className="clase-content">
                            <h3 className="clase-title">{clase.nombre}</h3>
                            <p className="clase-description">{clase.descripcion}</p>
                            <div className="clase-details">
                              <div className="detail-item">
                                <FaCalendarAlt className="detail-icon" />
                                <span>{clase.fecha}</span>
                              </div>                        
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="empty-clases">
                    <div className="empty-icon">
                      <FaChalkboardTeacher />
                    </div>
                    <h3>No hay clases disponibles</h3>
                    <p>Crea tu primera clase para comenzar a organizar tus actividades académicas</p>
                    <Button className="create-btn mt-3" onClick={handleOpenCreateModal}>
                      <FaPlus /> Nueva Clase
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </div>
      </Container>

      {/* Modal para crear clase */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered className="clase-modal">
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la clase</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: Grupo A"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Breve descripción de la clase"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3"> 
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowCreateModal(false)}>
            <FaTimes /> Cancelar
          </Button>
          <Button className="save-btn" onClick={handleCreateClase}>
            <FaSave /> Crear Clase
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar clase */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className="clase-modal">
        <Modal.Header closeButton>
          <Modal.Title>Editar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la clase</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: Grupo A"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Breve descripción de la clase"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            <FaTimes /> Cancelar
          </Button>
          <Button className="save-btn" onClick={handleEditClase}>
            <FaSave /> Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered className="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Clase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-confirmation">
            <div className="delete-icon">
              <FaTrash />
            </div>
            <p>
              ¿Estás seguro que deseas eliminar la clase <strong>{currentClase?.nombre}</strong>?
            </p>
            <p className="text-danger">Esta acción no se puede deshacer.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            <FaTimes /> Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteClase}>
            <FaTrash /> Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ClasesPage

