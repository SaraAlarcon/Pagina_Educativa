"use client"

import { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { FaUsers, FaHome, FaUserGraduate, FaChalkboardTeacher, FaUserPlus, FaTrash, FaLayerGroup } from "react-icons/fa"
import "../../styles/AdminStyle/Registros.css"

const RegistroGrupos = () => {
  const [grupoId, setGrupoId] = useState("")
  const [grupoNombre, setGrupoNombre] = useState("")
  const [docenteAsignado, setDocenteAsignado] = useState("")
  const [estudiantes, setEstudiantes] = useState([""])

  const handleAgregarEstudiante = () => {
    setEstudiantes([...estudiantes, ""])
  }

  const handleEstudianteChange = (index, value) => {
    const nuevosEstudiantes = [...estudiantes]
    nuevosEstudiantes[index] = value
    setEstudiantes(nuevosEstudiantes)
  }

  const handleRemoveEstudiante = (index) => {
    if (estudiantes.length > 1) {
      const nuevosEstudiantes = [...estudiantes]
      nuevosEstudiantes.splice(index, 1)
      setEstudiantes(nuevosEstudiantes)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const grupoData = {
      id: grupoId,
      grupo: grupoNombre,
      docente: docenteAsignado,
      estudiantes: estudiantes.filter((e) => e.trim() !== ""),
    }
    console.log("Grupo registrado:", grupoData)
    setGrupoId("")
    setGrupoNombre("")
    setDocenteAsignado("")
    setEstudiantes([""])
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
            <a href="/registro-docente" className="sidebar-link">
              <FaChalkboardTeacher /> Registro Docente
            </a>
          </li>
          <li>
            <a href="/grupos" className="sidebar-link active">
              <FaUsers /> Grupos
            </a>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="registro-grupos-container">
        <Card className="registro-card p-4">
          <h3 className="mb-4">Registro de Grupo</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ID del Grupo</Form.Label>
              <Form.Control
                type="text"
                value={grupoId}
                onChange={(e) => setGrupoId(e.target.value)}
                placeholder="Ej: G-01"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del Grupo</Form.Label>
              <Form.Control
                type="text"
                value={grupoNombre}
                onChange={(e) => setGrupoNombre(e.target.value)}
                placeholder="Ej: Matemáticas Avanzadas"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Asignar Docente</Form.Label>
              <Form.Control
                type="text"
                value={docenteAsignado}
                onChange={(e) => setDocenteAsignado(e.target.value)}
                placeholder="Nombre del docente"
                required
              />
            </Form.Group>

            <div className="estudiantes-section">
              <div className="estudiantes-header">
                <h5 className="estudiantes-title">Estudiantes</h5>
              </div>

              {estudiantes.map((estudiante, index) => (
                <div key={index} className="estudiante-item">
                  <Form.Control
                    type="text"
                    placeholder={`Estudiante ${index + 1}`}
                    value={estudiante}
                    onChange={(e) => handleEstudianteChange(index, e.target.value)}
                    required
                  />
                  {estudiantes.length > 1 && (
                    <button
                      type="button"
                      className="remove-estudiante"
                      onClick={() => handleRemoveEstudiante(index)}
                      aria-label="Eliminar estudiante"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <Button variant="secondary" className="btn-add-estudiante" onClick={handleAgregarEstudiante}>
              <FaUserPlus /> Añadir Estudiante
            </Button>

            <Button type="submit" className="btn-primary">
              <FaLayerGroup className="me-2" /> Registrar Grupo
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegistroGrupos
