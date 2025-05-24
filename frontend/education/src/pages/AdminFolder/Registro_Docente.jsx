import { useState } from "react"
import { Form, Button, Card, Table } from "react-bootstrap"
import { FaUserPlus, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaDoorOpen } from "react-icons/fa"

const RegistroDocente = () => {
  const [formData, setFormData] = useState({
    idDocente: "",
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    grupos: ["G-01"],
  })
  const [docentesRegistrados, setDocentesRegistrados] = useState([])

  const handleChange = (e) => {
    const { name, value, options } = e.target
    if (name === "grupos") {
      const selectedOptions = Array.from(options).filter(o => o.selected).map(o => o.value)
      setFormData({ ...formData, grupos: selectedOptions })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDocentesRegistrados([...docentesRegistrados, formData])
    setFormData({ idDocente: "", nombre: "", apellido: "", correo: "", contraseña: "", grupos: ["G-01"] })
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
              <FaUserGraduate /> Registro Estudiante
            </a>
          </li>
          <li>
            <a href="/registro-docente" className="sidebar-link active">
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
          <h3 className="mb-4">Registro de Docente</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID del Docente</Form.Label>
              <Form.Control
                type="text"
                name="idDocente"
                value={formData.idDocente}
                onChange={handleChange}
                placeholder="Ej: D20250012"
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
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-3">
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
              <Form.Label>Asignar Grupo(s)</Form.Label>
              <Form.Select
                name="grupos"
                multiple
                value={formData.grupos}
                onChange={handleChange}
                required
              >
                <option value="G-01">G-01</option>
                <option value="G-02">G-02</option>
                <option value="G-03">G-03</option>
              </Form.Select>
              <small className="text-muted">Usa Ctrl (Cmd en Mac) para seleccionar múltiples grupos</small>
            </Form.Group>
            <Button type="submit" className="btn-primary">
              <FaUserPlus className="me-2" /> Registrar Docente
            </Button>
          </Form>
        </Card>

        {docentesRegistrados.length > 0 && (
          <Card className="registro-card p-4 mt-4">
            <h4 className="mb-3">Docentes Registrados</h4>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Grupo(s)</th>
                </tr>
              </thead>
              <tbody>
                {docentesRegistrados.map((docente, index) => (
                  <tr key={index}>
                    <td>{docente.idDocente}</td>
                    <td>{docente.nombre}</td>
                    <td>{docente.apellido}</td>
                    <td>{docente.correo}</td>
                    <td>{docente.grupos.join(", ")}</td>
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

export default RegistroDocente
