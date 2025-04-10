"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { FaSearch, FaPaperPlane, FaEllipsisV, FaPhone, FaVideo, FaSmile, FaPaperclip } from "react-icons/fa"
import  CustomNavbar  from "../../components/navbar"
import Sidebar from "../../components/sidebar"
import "../../styles/DocenteStyle/ChatsDocente.css"

const ChatsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  // Simular contactos
  const contacts = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Estudiante",
      online: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "¿Podría revisar mi tarea?",
      time: "10:30",
      unread: 2,
      messages: [
        { id: 1, text: "Hola profesor, ¿cómo está?", sender: "contact", time: "10:20" },
        { id: 2, text: "Hola Juan, estoy bien ¿y tú?", sender: "user", time: "10:22" },
        { id: 3, text: "Bien, gracias. Tengo una duda sobre la tarea", sender: "contact", time: "10:25" },
        { id: 4, text: "¿Podría revisar mi tarea?", sender: "contact", time: "10:30" },
      ],
    },
    {
      id: 2,
      name: "María Gómez",
      role: "Estudiante",
      online: false,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Gracias por la explicación",
      time: "Ayer",
      unread: 0,
      messages: [
        { id: 1, text: "Profesor, no entiendo el ejercicio 3", sender: "contact", time: "Ayer 15:40" },
        {
          id: 2,
          text: "Claro María, el ejercicio 3 requiere que apliques la fórmula que vimos en clase",
          sender: "user",
          time: "Ayer 15:45",
        },
        { id: 3, text: "Ahora lo entiendo, muchas gracias", sender: "contact", time: "Ayer 15:50" },
        { id: 4, text: "Gracias por la explicación", sender: "contact", time: "Ayer 16:00" },
      ],
    },
    {
      id: 3,
      name: "Carlos López",
      role: "Estudiante",
      online: true,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      lastMessage: "¿Cuándo es la próxima clase?",
      time: "12:45",
      unread: 1,
      messages: [
        { id: 1, text: "Buenos días profesor", sender: "contact", time: "12:30" },
        { id: 2, text: "Buenos días Carlos, ¿en qué puedo ayudarte?", sender: "user", time: "12:35" },
        { id: 3, text: "Quería consultar sobre el horario", sender: "contact", time: "12:40" },
        { id: 4, text: "¿Cuándo es la próxima clase?", sender: "contact", time: "12:45" },
      ],
    },
    {
      id: 4,
      name: "Ana Rodríguez",
      role: "Docente",
      online: true,
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      lastMessage: "Nos vemos en la reunión",
      time: "09:15",
      unread: 0,
      messages: [
        { id: 1, text: "Hola, ¿tienes un momento?", sender: "contact", time: "09:00" },
        { id: 2, text: "Claro Ana, dime", sender: "user", time: "09:05" },
        { id: 3, text: "Quería recordarte la reunión de departamento", sender: "contact", time: "09:10" },
        { id: 4, text: "Nos vemos en la reunión", sender: "contact", time: "09:15" },
      ],
    },
    {
      id: 5,
      name: "Roberto Sánchez",
      role: "Docente",
      online: false,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      lastMessage: "Te envié el material por correo",
      time: "Lunes",
      unread: 0,
      messages: [
        { id: 1, text: "Hola, necesito el material para la clase del jueves", sender: "contact", time: "Lunes 14:20" },
        { id: 2, text: "Hola Roberto, lo estoy preparando", sender: "user", time: "Lunes 14:30" },
        { id: 3, text: "Gracias, lo necesito para preparar mi clase", sender: "contact", time: "Lunes 14:35" },
        { id: 4, text: "Te envié el material por correo", sender: "contact", time: "Lunes 15:00" },
      ],
    },
  ]

  // Filtrar contactos según la búsqueda
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Manejar el envío de mensajes
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim() || !selectedChat) return

    // Simular el envío de un mensaje
    const newMessage = {
      id: selectedChat.messages.length + 1,
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Actualizar el chat seleccionado con el nuevo mensaje
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: message,
      time: "Ahora",
    }

    // Actualizar el estado
    setSelectedChat(updatedChat)
    setMessage("")
  }

  // Detectar cambios en el ancho de la ventana para responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determinar si mostrar la lista de chats en móvil
  const showChatList = !selectedChat || windowWidth >= 768

  return (
    <div className="chats-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          {/* Sidebar Izquierdo */}
          <Col md={2} className="sidebar-left-col">
            <Sidebar />
          </Col>

          {/* Sección central - Chats */}
          <Col md={10} className="chats-section-col">
            <div className="chats-content">
              <Row className="h-100">
                {/* Lista de chats */}
                {showChatList && (
                  <Col md={4} className="chat-list-col">
                    <div className="chat-list-header">
                      <h3>Mensajes</h3>
                      <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                          type="text"
                          placeholder="Buscar contactos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="search-input"
                        />
                      </div>
                    </div>

                    <div className="chat-list">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`chat-item ${selectedChat?.id === contact.id ? "active" : ""}`}
                          onClick={() => setSelectedChat(contact)}
                        >
                          <div className="chat-avatar">
                            <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <span className={`status-indicator ${contact.online ? "online" : "offline"}`}></span>
                          </div>
                          <div className="chat-info">
                            <div className="chat-header">
                              <h4 className="chat-name">{contact.name}</h4>
                              <span className="chat-time">{contact.time}</span>
                            </div>
                            <div className="chat-preview">
                              <p className="chat-last-message">{contact.lastMessage}</p>
                              {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                )}

                {/* Área de chat */}
                <Col md={8} className="chat-area-col">
                  {selectedChat ? (
                    <>
                      <div className="chat-header">
                        <div className="chat-user">
                          {windowWidth < 768 && (
                            <button className="back-button" onClick={() => setSelectedChat(null)}>
                              &larr;
                            </button>
                          )}
                          <div className="chat-avatar">
                            <img src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                            <span className={`status-indicator ${selectedChat.online ? "online" : "offline"}`}></span>
                          </div>
                          <div className="chat-user-info">
                            <h4>{selectedChat.name}</h4>
                            <p className="user-status">{selectedChat.online ? "En línea" : "Desconectado"}</p>
                          </div>
                        </div>
                        <div className="chat-actions">
                          <button className="action-button">
                            <FaPhone />
                          </button>
                          <button className="action-button">
                            <FaVideo />
                          </button>
                          <button className="action-button">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </div>

                      <div className="chat-messages">
                        {selectedChat.messages.map((msg) => (
                          <div key={msg.id} className={`message ${msg.sender === "user" ? "sent" : "received"}`}>
                            <div className="message-content">
                              <p>{msg.text}</p>
                              <span className="message-time">{msg.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form className="chat-input" onSubmit={handleSendMessage}>
                        <div className="input-actions-left">
                          <button type="button" className="input-action">
                            <FaSmile />
                          </button>
                          <button type="button" className="input-action">
                            <FaPaperclip />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Escribe un mensaje..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button type="submit" className="send-button" disabled={!message.trim()}>
                          <FaPaperPlane />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="empty-chat">
                      <div className="empty-chat-icon">💬</div>
                      <h3>Selecciona un chat para comenzar</h3>
                      <p>Elige un contacto de la lista para ver la conversación</p>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default ChatsPage
