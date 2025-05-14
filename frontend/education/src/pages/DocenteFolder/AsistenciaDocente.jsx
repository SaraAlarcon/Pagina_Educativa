"use client"

import { useState } from "react"
import { Container, Col, Form, Button, Card } from "react-bootstrap"
import { FaUserCheck, FaBook, FaCalendarAlt, FaSearch, FaSave, FaUserGraduate, FaCheckCircle, FaTimesCircle, FaExclamationCircle,
} from "react-icons/fa"
import Sidebar from "../../components/sidebar"
import CustomNavbar from "../../components/navbar"
import "../../styles/DocenteStyle/AsistenciaDocente.css"

const TomaListaDocente = () => {
  const clases = [
    { id: 1, nombre: "Programación I", color: "#00a9f4" },
    { id: 2, nombre: "Estructuras de Datos", color: "#00eca4" },
    { id: 3, nombre: "Base de Datos", color: "#9c27b0" },
  ]

  const [claseSeleccionada, setClaseSeleccionada] = useState(clases[0].id)
  const [fechaAsistencia, setFechaAsistencia] = useState(new Date().toISOString().split("T")[0])
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de estudiantes por clase
  const estudiantes = {
    1: [
      { id: 1, nombre: "Ana", apellido: "Gómez", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
      { id: 2, nombre: "Luis", apellido: "Martínez", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { id: 3, nombre: "Carla", apellido: "Pérez", foto: "https://randomuser.me/api/portraits/women/28.jpg" },
      { id: 4, nombre: "Pedro", apellido: "Sánchez", foto: "https://randomuser.me/api/portraits/men/22.jpg" },
      { id: 5, nombre: "María", apellido: "López", foto: "https://randomuser.me/api/portraits/women/17.jpg" },
    ],
    2: [
      { id: 6, nombre: "Juan", apellido: "Ramírez", foto: "https://randomuser.me/api/portraits/men/46.jpg" },
      { id: 7, nombre: "Sofía", apellido: "Díaz", foto: "https://randomuser.me/api/portraits/women/65.jpg" },
      { id: 8, nombre: "Roberto", apellido: "Fernández", foto: "https://randomuser.me/api/portraits/men/55.jpg" },
    ],
    3: [
      { id: 9, nombre: "Laura", apellido: "Torres", foto: "https://randomuser.me/api/portraits/women/33.jpg" },
      { id: 10, nombre: "Carlos", apellido: "Mendoza", foto: "https://randomuser.me/api/portraits/men/41.jpg" },
      { id: 11, nombre: "Valentina", apellido: "Herrera", foto: "https://randomuser.me/api/portraits/women/49.jpg" },
    ],
  }

  // Estado para las asistencias
  const [asistencias, setAsistencias] = useState({})

  // Historial de asistencias (simulado)
  const [historialAsistencias, setHistorialAsistencias] = useState({
    1: {
      "2023-05-10": { 1: "asistio", 2: "asistio", 3: "no_asistio", 4: "asistio", 5: "excusa" },
      "2023-05-12": { 1: "asistio", 2: "asistio", 3: "asistio", 4: "no_asistio", 5: "asistio" },
    },
    2: {
      "2023-05-11": { 6: "asistio", 7: "no_asistio", 8: "asistio" },
    },
    3: {
      "2023-05-09": { 9: "asistio", 10: "asistio", 11: "excusa" },
    },
  })

  // Cargar asistencias previas si existen para la fecha seleccionada
  const cargarAsistenciasPrevias = () => {
    if (
      historialAsistencias[claseSeleccionada] &&
      historialAsistencias[claseSeleccionada][fechaAsistencia]
    ) {
      setAsistencias(historialAsistencias[claseSeleccionada][fechaAsistencia])
    } else {
      setAsistencias({})
    }
  }

  // Manejar cambio de asistencia
  const manejarCambio = (idEstudiante, estado) => {
    setAsistencias({ ...asistencias, [idEstudiante]: estado })
  }

  // Manejar envío de asistencias
  const manejarEnvio = () => {
    // Actualizar el historial de asistencias
    const nuevoHistorial = { ...historialAsistencias }
    
    if (!nuevoHistorial[claseSeleccionada]) {
      nuevoHistorial[claseSeleccionada] = {}
    }
    
    nuevoHistorial[claseSeleccionada][fechaAsistencia] = asistencias
    
    setHistorialAsistencias(nuevoHistorial)
    
    // Mostrar mensaje de éxito (en un caso real, aquí iría la llamada a la API)
    alert("Asistencias guardadas correctamente")
  }

  // Filtrar estudiantes por búsqueda
  const estudiantesFiltrados = estudiantes[claseSeleccionada]?.filter(
    (est) =>
      `${est.nombre} ${est.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  // Calcular estadísticas de asistencia para la clase seleccionada
  const calcularEstadisticas = () => {
    const totalEstudiantes = estudiantes[claseSeleccionada]?.length || 0
    let totalAsistencias = 0
    let totalFaltas = 0
    let totalExcusas = 0

    // Contar asistencias en el historial
    Object.values(historialAsistencias[claseSeleccionada] || {}).forEach((diaAsistencia) => {
      Object.values(diaAsistencia).forEach((estado) => {
        if (estado === "asistio") totalAsistencias++
        else if (estado === "no_asistio") totalFaltas++
        else if (estado === "excusa") totalExcusas++
      })
    })

    const totalDias = Object.keys(historialAsistencias[claseSeleccionada] || {}).length
    const porcentajeAsistencia = totalDias > 0 ? (totalAsistencias / (totalDias * totalEstudiantes)) * 100 : 0

    return {
      totalEstudiantes,
      totalDias,
      totalAsistencias,
      totalFaltas,
      totalExcusas,
      porcentajeAsistencia: porcentajeAsistencia.toFixed(1),
    }
  }

  const estadisticas = calcularEstadisticas()

  return (
    <div className="asistencias-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          <Col md={2} className="sidebar-left-col">
            <Sidebar />
          </Col>

          <Col md={10} className="asistencias-section-col">
            <div className="asistencias-content">
              <div className="asistencias-header">
                <div className="asistencias-title">
                  <h2>
                    <FaUserCheck className="title-icon" /> Control de Asistencia
                  </h2>
                  <p>Registra la asistencia de tus estudiantes</p>
                </div>
                <div className="asistencias-actions">
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar estudiantes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              <div className="asistencias-controls">
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

                <div className="fecha-selector">
                  <div className="fecha-selector-label">
                    <FaCalendarAlt className="fecha-icon" /> Fecha:
                  </div>
                  <Form.Control
                    type="date"
                    value={fechaAsistencia}
                    onChange={(e) => setFechaAsistencia(e.target.value)}
                    className="fecha-input"
                  />
                  <Button className="cargar-btn" onClick={cargarAsistenciasPrevias}>
                    Cargar Asistencias
                  </Button>
                </div>
              </div>

              <div className="asistencias-grid">
                <div className="estadisticas-container">
                  <div className="card-header">
                    <h3>
                      <FaUserGraduate className="card-icon" /> Estadísticas
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="estadistica-item">
                      <div className="estadistica-label">Total de estudiantes:</div>
                      <div className="estadistica-valor">{estadisticas.totalEstudiantes}</div>
                    </div>
                    <div className="estadistica-item">
                      <div className="estadistica-label">Días registrados:</div>
                      <div className="estadistica-valor">{estadisticas.totalDias}</div>
                    </div>
                    <div className="estadistica-item">
                      <div className="estadistica-label">Total asistencias:</div>
                      <div className="estadistica-valor asistencias">{estadisticas.totalAsistencias}</div>
                    </div>
                    <div className="estadistica-item">
                      <div className="estadistica-label">Total faltas:</div>
                      <div className="estadistica-valor faltas">{estadisticas.totalFaltas}</div>
                    </div>
                    <div className="estadistica-item">
                      <div className="estadistica-label">Total excusas:</div>
                      <div className="estadistica-valor excusas">{estadisticas.totalExcusas}</div>
                    </div>
                    <div className="estadistica-item porcentaje">
                      <div className="estadistica-label">Porcentaje de asistencia:</div>
                      <div className="estadistica-valor">{estadisticas.porcentajeAsistencia}%</div>
                    </div>

                    <div className="asistencia-info">
                      <p>
                        <FaCheckCircle className="info-icon asistio" /> Asistió
                      </p>
                      <p>
                        <FaTimesCircle className="info-icon no-asistio" /> No asistió
                      </p>
                      <p>
                        <FaExclamationCircle className="info-icon excusa" /> Excusa
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lista-estudiantes-container">
                  <div className="list-header">
                    <h3>
                      <FaUserCheck className="list-icon" /> Lista de Estudiantes
                    </h3>
                  </div>

                  {estudiantesFiltrados.length > 0 ? (
                    <div className="estudiantes-list">
                      {estudiantesFiltrados.map((est) => (
                        <div key={est.id} className="estudiante-item">
                          <div className="estudiante-info">
                            <img src={est.foto || "/placeholder.svg"} alt={`${est.nombre} ${est.apellido}`} className="estudiante-foto" />
                            <span className="estudiante-nombre">
                              {est.nombre} {est.apellido}
                            </span>
                          </div>
                          <div className="asistencia-opciones">
                            <div className="opcion-asistencia">
                              <input
                                type="radio"
                                id={`asistio-${est.id}`}
                                name={`asistencia-${est.id}`}
                                checked={asistencias[est.id] === "asistio"}
                                onChange={() => manejarCambio(est.id, "asistio")}
                              />
                              <label htmlFor={`asistio-${est.id}`} className="asistio">
                                <FaCheckCircle /> Asistió
                              </label>
                            </div>
                            <div className="opcion-asistencia">
                              <input
                                type="radio"
                                id={`no-asistio-${est.id}`}
                                name={`asistencia-${est.id}`}
                                checked={asistencias[est.id] === "no_asistio"}
                                onChange={() => manejarCambio(est.id, "no_asistio")}
                              />
                              <label htmlFor={`no-asistio-${est.id}`} className="no-asistio">
                                <FaTimesCircle /> No asistió
                              </label>
                            </div>
                            <div className="opcion-asistencia">
                              <input
                                type="radio"
                                id={`excusa-${est.id}`}
                                name={`asistencia-${est.id}`}
                                checked={asistencias[est.id] === "excusa"}
                                onChange={() => manejarCambio(est.id, "excusa")}
                              />
                              <label htmlFor={`excusa-${est.id}`} className="excusa">
                                <FaExclamationCircle /> Excusa
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="guardar-container">
                        <Button className="guardar-btn" onClick={manejarEnvio}>
                          <FaSave /> Guardar Asistencias
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-estudiantes">
                      <div className="empty-icon">👥</div>
                      <h3>No hay estudiantes</h3>
                      <p>No se encontraron estudiantes para esta clase o con el término de búsqueda.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default TomaListaDocente
