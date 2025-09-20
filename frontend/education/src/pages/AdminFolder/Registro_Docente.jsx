import { useState, useEffect } from "react"
import { Form, Button, Card, Table, Modal } from "react-bootstrap"
import { FaUserPlus, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaDoorOpen } from "react-icons/fa"
import { TeacherService } from "../../services/TeacherService"
import { GroupService } from "../../services/GroupService"
import "./Registro_Docente.css"

const RegistroDocente = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [getAllDocentes, setGetAllDocentes] = useState([])
  const [grupos, setGrupos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [docenteToDelete, setDocenteToDelete] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEdit = (docente) => {
    setIsEditing(true)
    setEditingId(docente.id)
    // Separar el nombre completo en nombre y apellido
    const [name, lastName] = docente.NombreCompleto.split(' ')
    setFormData({
      name: name || '',
      lastName: lastName || '',
      email: docente.user?.email || '',
      password: '' // No mostramos la contraseña por seguridad
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isEditing) {
        // Actualizar docente
        const data = await TeacherService.update(editingId, {
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
        // Registrar nuevo docente
        const data = await TeacherService.register(
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
      await fetchDocentes()
    } catch (err) {
      setError(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el docente`)
      alert(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el docente`)
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

  const handleDeleteClick = (docente) => {
    setDocenteToDelete(docente)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!docenteToDelete) return

    setIsLoading(true)
    setError(null)
    try {
      await TeacherService.delete(docenteToDelete.id)
      await fetchDocentes()
    } catch (err) {
      setError(err.message || 'Error al eliminar el docente')
      alert(err.message || 'Error al eliminar el docente')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
      setDocenteToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDocenteToDelete(null)
  }

  const fetchDocentes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await TeacherService.getAll()
      setGetAllDocentes(data)
      await fetchGrupos();
    } catch (err) {
      setError(err.message || 'Error al cargar los docentes')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGrupos = async () => {
    try {
      const data = await GroupService.getAll()
      setGrupos(data)
    } catch (err) {
      setError('Error al cargar los grupos')
      console.error('Error:', err)
    }
  }

  useEffect(() => {
    fetchDocentes()
  }, [])

  const getGruposByDocente = (docenteId) => {
    console.log(grupos.filter(grupo => grupo.docente.id === docenteId))
    return grupos.filter(grupo => grupo.docente.id === docenteId)
  }

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
            <h3 className="mb-4">{isEditing ? 'Actualizar Docente' : 'Registrar Docente'}</h3>
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

          {getAllDocentes.length > 0 && (
            <Card className="registro-card p-4">
              <h4 className="mb-3">Lista de Docentes</h4>
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
                    {getAllDocentes.map((docente, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{docente.NombreCompleto}</td>
                        <td>{docente.user?.email || 'No disponible'}</td>
                        <td>
                          {getGruposByDocente(docente.id).length > 0 ? (
                            <ul className="list-unstyled mb-0">
                              {getGruposByDocente(docente.id).map(grupo => (
                                <li key={grupo.id} className="mb-1">
                                  <span className="badge bg-primary">{grupo.nombre}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-muted">Sin grupos asignados</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleEdit(docente)}
                              disabled={isLoading}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleDeleteClick(docente)}
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
          ¿Está seguro que desea eliminar al docente {docenteToDelete?.NombreCompleto}?
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

export default RegistroDocente
