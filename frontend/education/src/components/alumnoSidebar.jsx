"use client"
import {FaClipboardList,FaGraduationCap, FaCalendarAlt, FaBook, FaChartBar, FaCog, FaComments, FaHome, } from "react-icons/fa"
import "../stylescomponents/sidebar.css"

const SidebarAlumno = () => {
  // Función para manejar la navegación sin React Router
  const handleNavigation = (path) => {
    window.location.href = path
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>Panel Estudiante</h3>
      </div>

      <div className="sidebar">
        <ul className="sidebar-menu">
          {/* Inicio */}
          <li className="sidebar-item active">
            <div onClick={() => handleNavigation("/estudiante")} className="sidebar-link">
              <div className="sidebar-icon">
                <FaHome />
              </div>
              <div className="sidebar-text">Inicio</div>
            </div>
          </li>

          {/* Actividades */}
          <li className="sidebar-item">
            <div onClick={() => handleNavigation("/estudiante/actividades")} className="sidebar-link">
              <div className="sidebar-icon">
                <FaClipboardList />
              </div>
              <div className="sidebar-text">Actividades</div>
            </div>
          </li>

          {/* Clases */}
          <li className="sidebar-item">
            <div onClick={() => handleNavigation("/estudiante/clases")} className="sidebar-link">
              <div className="sidebar-icon">
                <FaGraduationCap />
              </div>
              <div className="sidebar-text">Clases</div>
            </div>
          </li>

          {/* Chats */}
          <li className="sidebar-item">
            <div onClick={() => handleNavigation("/estudiante/chats")} className="sidebar-link">
              <div className="sidebar-icon">
                <FaComments />
              </div>
              <div className="sidebar-text">Chats</div>
            </div>
          </li>

          {/* Calificaciones */}
          <li className="sidebar-item">
            <div onClick={() => handleNavigation("/estudiante/calificaciones")} className="sidebar-link">
              <div className="sidebar-icon">
                <FaChartBar />
              </div>
              <div className="sidebar-text">Calificaciones</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarAlumno
