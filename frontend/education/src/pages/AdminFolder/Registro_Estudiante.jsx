import { useState } from "react"
import { Form, Button, Card, Table } from "react-bootstrap"
import { FaUserPlus, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaDoorOpen } from "react-icons/fa"

const RegistroEstudiante = () => {
  const [formData, setFormData] = useState({
    idEstudiante: "",
    nombre: "",
    apellido: "", 
    correo: "",
    contraseña: "",
    grupo: "G-01",
  })
  const [estudiantesRegistrados, setEstudiantesRegistrados] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEstudiantesRegistrados([...estudiantesRegistrados, formData])
    setFormData({ idEstudiante: "", nombre: "", apellido: "", correo: "", contraseña: "", grupo: "G-01" })
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
            <a href="/registro-estudiante" className="sidebar-link active">
              <FaUserGraduate /> Registro Estudiante
            </a>
          </li>
          <li>
            <a href="/registro-docente" className="sidebar-link">
              <FaChalkboardTeacher /> Registro Docente
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
        <Card className="registro-card p-4">
          <h3 className="mb-4">Registro de Estudiante</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID del Estudiante</Form.Label>
              <Form.Control
                type="text"
                name="idEstudiante"
                value={formData.idEstudiante}
                onChange={handleChange}
                placeholder="Ej: 202500123"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ingrese el apellido"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                placeholder="Ingrese una contraseña"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Asignar Grupo</Form.Label>
              <Form.Select name="grupo" value={formData.grupo} onChange={handleChange} required>
                <option value="G-01">G-01</option>
                <option value="G-02">G-02</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="btn-primary">
              <FaUserPlus className="me-2" /> Registrar Estudiante
            </Button>
          </Form>
        </Card>

        {estudiantesRegistrados.length > 0 && (
          <Card className="registro-card p-4 mt-4">
            <h4 className="mb-3">Estudiantes Registrados</h4>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Grupo</th>
                </tr>
              </thead>
              <tbody>
                {estudiantesRegistrados.map((estudiante, index) => (
                  <tr key={index}>
                    <td>{estudiante.idEstudiante}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido}</td>
                    <td>{estudiante.correo}</td>
                    <td>{estudiante.grupo}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  )
}

export default RegistroEstudiante
