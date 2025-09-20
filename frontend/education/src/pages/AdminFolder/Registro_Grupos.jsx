import { useState, useEffect } from "react"
import { Form, Button, Card, Table, Modal } from "react-bootstrap"
import { FaUsers, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUserPlus, FaTrash, FaLayerGroup, FaDoorOpen } from "react-icons/fa"
import "../../styles/AdminStyle/Registros.css"
import { TeacherService } from "../../services/TeacherService"
import { GroupService } from "../../services/GroupService"

const RegistroGrupos = () => {
  const [formData, setFormData] = useState({
    name: "",
    docenteId: null
  })
  const [getAllGrupo, setGetAllGrupo] = useState([])
  const [docentes, setDocentes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [grupoToDelete, setGrupoToDelete] = useState(null)

  useEffect(() => {
    fetchDocentes()
    fetchGrupos()
  }, [])

  const fetchDocentes = async () => {
    try {
      const data = await TeacherService.getAll()
      setDocentes(data)
    } catch (err) {
      setError('Error al cargar los docentes')
      console.error('Error:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEdit = (grupo) => {
    setIsEditing(true)
    setEditingId(grupo.id)
    // Separar el nombre completo en nombre y apellido
    const [name] = grupo.nombre.split(' ')
    setFormData({
      name: name || '',
      docenteId: docenteId || null
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (isEditing) {
        // Actualizar docente de un grupo
        const data = await GroupService.update(editingId, {
          docenteId: formData.docenteId
        })
        if (data) {
          setIsEditing(false)
          setEditingId(null)
          setFormData({
            name: "",
            docenteId: null
          })
        }
      } else {
        // Registrar nuevo grupo
        const data = await GroupService.register(
          formData.name, 
          formData.docenteId
        )
        if (data) {
          setFormData({
            name: "",
            docenteId: null
          })
        }
      }
      await fetchGrupos()
    } catch (err) {
      setError(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el grupo`)
      alert(err.message || `Error al ${isEditing ? 'actualizar' : 'registrar'} el grupo`)
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
      docenteId: null
    })
  }

  const handleDeleteClick = (grupo) => {
    setGrupoToDelete(grupo)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!grupoToDelete) return

    setIsLoading(true)
    setError(null)
    try {
      await GroupService.delete(grupoToDelete.id)
      await fetchGrupos()
    } catch (err) {
      setError(err.message || 'Error al eliminar el grupo')
      alert(err.message || 'Error al eliminar el grupo')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
      setGrupoToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setGrupoToDelete(null)
  }

  const fetchGrupos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await GroupService.getAll()
      setGetAllGrupo(data)
    } catch (err) {
      setError(err.message || 'Error al cargar los grupos')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
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
            <h3 className="mb-4">{isEditing ? 'Actualizar Grupo' : 'Registrar Grupo'}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <div className="row">
                
                {!isEditing && (
                  <div className="col-md-6 mb-3">
                    <Form.Group>
                    <Form.Label>Nombre del Grupo:</Form.Label>
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
                )}
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label>Docente:</Form.Label>
                    <Form.Select
                      name="docenteId"
                      value={formData.docenteId || ""}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    >
                      <option value="">Seleccione un docente</option>
                      {docentes.map((docente) => (
                        <option key={docente.id} value={docente.id}>
                          {docente.user?.email}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
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

          {getAllGrupo.length > 0 && (
            <Card className="registro-card p-4">
              <h4 className="mb-3">Lista de Grupos</h4>
              <div className="table-responsive">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Docente</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllGrupo.map((grupo, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{grupo.nombre}</td>
                        <td>{grupo.docente?.NombreCompleto || 'No disponible'}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleEdit(grupo)}
                              disabled={isLoading}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleDeleteClick(grupo)}
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
          ¿Está seguro que desea eliminar el grupo {grupoToDelete?.nombre}?
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

export default RegistroGrupos
