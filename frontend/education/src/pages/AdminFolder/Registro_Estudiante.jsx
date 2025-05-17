import { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { FaUserPlus, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUsers } from "react-icons/fa"

const RegistroEstudiante = () => {
  const [formData, setFormData] = useState({
    idEstudiante: "",
    nombre: "",
    apellido: "",
    correo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Estudiante registrado:", formData)
    setFormData({ idEstudiante: "", nombre: "", apellido: "", correo: "" })
    // Aquí iría la lógica para enviar los datos al servidor
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
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="registro-estudiante-container">
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
            <Button type="submit" className="btn-primary">
              <FaUserPlus className="me-2" /> Registrar Estudiante
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegistroEstudiante
