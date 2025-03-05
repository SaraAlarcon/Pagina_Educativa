import React, { useState } from "react";
import { FaUser, FaBell, FaTimes, FaPaperPlane, FaCircle } from "react-icons/fa";
import "../stylescomponents/Contacts.css";

const RightSidebar = () => {
  const [openChats, setOpenChats] = useState([]);

  const notifications = [
    { id: 1, message: "Nueva tarea asignada" },
    { id: 2, message: "Tu actividad ha sido calificada" },
    { id: 3, message: "Nuevo comentario en tu publicación" },
  ];

  const contacts = [
    { id: 1, name: "Juan Pérez", online: true },
    { id: 2, name: "María Gómez", online: false },
    { id: 3, name: "Carlos López", online: true },
  ];

  const openChat = (contact) => {
    if (!openChats.some((chat) => chat.id === contact.id)) {
      setOpenChats([...openChats, contact]);
    }
  };

  const closeChat = (id) => {
    setOpenChats(openChats.filter((chat) => chat.id !== id));
  };

  return (
    <>
      <div className="right-sidebar">
        {/* Notificaciones */}
        <div className="sidebar-right-section notifications">
          <h4 className="sidebar-right-title">Notificaciones</h4>
          <ul className="sidebar-right-menu">
            {notifications.map((notification) => (
              <li key={notification.id} className="sidebar-right-item">
                <FaBell className="sidebar-right-icon" />
                <span>{notification.message}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contactos */}
        <div className="sidebar-right-section contacts">
          <h4 className="sidebar-right-title">Contactos</h4>
          <ul className="sidebar-right-menu">
            {contacts.map((contact) => (
              <li key={contact.id} className="sidebar-right-item">
                <button
                  className="contact-button"
                  onClick={() => openChat(contact)}
                  onKeyDown={(e) => e.key === "Enter" && openChat(contact)}
                >
                  <FaUser className="sidebar-right-icon" />
                  <span>{contact.name}</span>
                  <FaCircle className={`status-dot ${contact.online ? "online" : "offline"}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ventanas de Chat */}
      <div className="chat-windows">
        {openChats.map((contact, index) => (
          <div key={contact.id} className="chat-window" style={{ right: `${320 + index * 310}px` }}>
            <div className="chat-header">
              <span>{contact.name}</span>
              <FaTimes className="close-chat" onClick={() => closeChat(contact.id)} />
            </div>
            <div className="chat-body">
              <div className="message received">Hola, ¿cómo estás?</div>
              <div className="message sent">¡Hola! Todo bien, ¿y tú?</div>
              <div className="message received">Muy bien, gracias. ¿Listo para la tarea?</div>
              <div className="message sent">Sí, vamos a hacerlo juntos.</div>
            </div>
            <div className="chat-footer">
              <input type="text" placeholder="Escribe un mensaje..." />
              <button className="send-button">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RightSidebar;
