"use client"

import { useState } from "react"
import { FaBell, FaSearch } from "react-icons/fa"
import "../stylescomponents/Contacts.css"

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const notifications = [
    { id: 1, message: "Nueva tarea asignada", time: "Hace 10 min" },
    { id: 2, message: "Tu actividad ha sido calificada", time: "Hace 30 min" },
    { id: 3, message: "Nuevo comentario en tu publicación", time: "Hace 1 hora" },
    { id: 4, message: "Reunión de profesores mañana", time: "Hace 2 horas" },
    { id: 5, message: "Nuevo material disponible", time: "Hace 3 horas" },
    { id: 6, message: "Recordatorio: Entrega de notas", time: "Hace 5 horas" },
    { id: 7, message: "Mensaje de la dirección", time: "Ayer" },
    { id: 8, message: "Actualización del sistema", time: "Ayer" },
  ]

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>Notificaciones</h3>
      </div>

      <div className="notifications-content">
        {/* Barra de búsqueda */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar notificaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Lista de notificaciones */}
        <div className="notification-list-container">
          {filteredNotifications.length > 0 ? (
            <ul className="notification-list">
              {filteredNotifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  <div className="notification-icon">
                    <FaBell />
                  </div>
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-notifications">
              <div className="empty-icon">🔔</div>
              <p>No hay notificaciones que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contacts

