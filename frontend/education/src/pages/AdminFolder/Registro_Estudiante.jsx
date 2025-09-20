import { useState, useEffect } from "react"
import { Form, Button, Card, Table, Modal } from "react-bootstrap"
import { FaUserPlus, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaDoorOpen } from "react-icons/fa";
import "./Registro_Docente.css"
import { EstudentService } from "../../services/EstudentService"

const RegistroEstudiante = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [getAllEstudiante, setGetAllEstudiante] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [estudianteToDelete, setEstudianteToDelete] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEdit = (estudiante) => {
    setIsEditing(true)
    setEditingId(estudiante.id)
    // Separar el nombre completo en nombre y apellido
    const [name, lastName] = estudiante.NombreCompleto.split(' ')
    setFormData({
      name: name || '',
      lastName: lastName || '',
      email: estudiante.user?.email || '',
      password: '' // No mostramos la contraseña por seguridad
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isEditing) {
        // Actualizar estudiante
        const data = await EstudentService.update(editingId, {
          NombreCompleto: `${formData.name} ${formData.lastName}`
        })
        if (data) {
          setIsEditing(false)
          setEditingId(null)
          setFormData({
            name: "",
            lastName: "",
            email: "",
            password: ""
          })
        }
      } else {
        // Registrar nuevo estudiante
        const data = await EstudentService.register(
          formData.name, 
          formData.lastName, 
          formData.email, 
          formData.password
        )
        if (data) {
          setFormData({
            name: "",
            lastName: "",
            email: "",
            password: ""
          })
        }
      }
      await fetchEstudiantes()
    } catch (err) {
      setError(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el estudiante`)
      alert(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el estudiante`)
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData({
      name: "",
      lastName: "",
      email: "",
      password: ""
    })
  }

  const handleDeleteClick = (estudiante) => {
    setEstudianteToDelete(estudiante)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!estudianteToDelete) return

    setIsLoading(true)
    setError(null)
    try {
      await EstudentService.delete(estudianteToDelete.id)
      await fetchEstudiantes()
    } catch (err) {
      setError(err.message || 'Error al eliminar el estudiante')
      alert(err.message || 'Error al eliminar el estudiante')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
      setEstudianteToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setEstudianteToDelete(null)
  }

  const fetchEstudiantes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await EstudentService.getAll()
      setGetAllEstudiante(data)
    } catch (err) {
      setError(err.message || 'Error al cargar los docentes')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEstudiantes()
  }, [])

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h1 className="sidebar-title">Admin</h1>
        <ul className="sidebar-menu">
          <li>
            <a href="/admin" className="sidebar-link">
              <FaHome /> Dashboard
            </a>
          </li>
          <li>
            <a href="/registro-estudiante" className="sidebar-link">
              <FaUserGraduate />Estudiantes
            </a>
          </li>
          <li>
            <a href="/registro-docente" className="sidebar-link active">
              <FaChalkboardTeacher /> Docentes
            </a>
          </li>
          <li>
            <a href="/grupos" className="sidebar-link">
              <FaUsers /> Grupos
            </a>
          </li>
          <li>
            <a href="/login" className="sidebar-link">
              <FaDoorOpen /> Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="registro-grupos-container">
        <div className="container-fluid py-4 px-3">
          <Card className="registro-card p-4 mb-4">
            <h3 className="mb-4">{isEditing ? 'Actualizar Estudiante' : 'Registrar Estudiante'}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label>Apellido:</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </Form.Group>
                </div>
              </div>
              {!isEditing && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Correo Electrónico:</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                      <Form.Label>Contraseña:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                      />
                    </Form.Group>
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-end gap-2">
                {isEditing && (
                  <Button 
                    variant="secondary" 
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                )}
                <Button type="submit" className="btn-primary" disabled={isLoading}>
                  <FaUserPlus className="me-2" /> 
                  {isLoading 
                    ? (isEditing ? 'Actualizando...' : 'Registrando...') 
                    : (isEditing ? 'Actualizar' : 'Registrar')}
                </Button>
              </div>
            </Form>
          </Card>

          {getAllEstudiante.length > 0 && (
            <Card className="registro-card p-4">
              <h4 className="mb-3">Lista de Estudiantes</h4>
              <div className="table-responsive">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre Completo</th>
                      <th>Correo</th>
                      <th>Grupos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllEstudiante.map((estudiante, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{estudiante.NombreCompleto}</td>
                        <td>{estudiante.user?.email || 'No disponible'}</td>
                        <td>grupos</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleEdit(estudiante)}
                              disabled={isLoading}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleDeleteClick(estudiante)}
                              disabled={isLoading}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar al estudiante {estudianteToDelete?.NombreCompleto}?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RegistroEstudiante
