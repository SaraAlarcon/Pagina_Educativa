"use client"

import { useState } from "react"
import { Col, Container } from "react-bootstrap"
import CustomNavbar from "../components/navbar"
import SidebarAlumno from "../components/alumnoSidebar"
import PostListEstudiante from "../components/alumnoPostform"
import Contacts from "../components/Contacts"
import "../styles/alumno.css"

const Estudiante = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Estimados estudiantes, les comparto el material para la próxima clase. Por favor revisen el documento adjunto y vengan preparados con preguntas.",
      file: null,
      date: "Hoy, 10:30 AM",
      author: {
        name: "Profesor Martínez",
        avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
      },
      comments: [
        {
          id: 1,
          text: "Gracias profesor, revisaré el material hoy mismo.",
          author: "Ana García",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          date: "Hoy, 11:15 AM",
        },
      ],
    },
    {
      id: 2,
      text: "Recuerden que la entrega del proyecto final es el próximo viernes. Si tienen dudas, pueden escribirme por el chat o preguntar en la próxima clase.",
      file: null,
      date: "Ayer, 15:45 PM",
      author: {
        name: "Profesor Martínez",
        avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
      },
      comments: [],
    },
  ])

  const addComment = (postId, commentText) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: post.comments.length + 1,
            text: commentText,
            author: "Carlos Estudiante",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "Ahora",
          }
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="estudiante-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          {/* Sidebar Izquierdo - Opciones */}
          <Col md={3} className="sidebar-left-col">
            <SidebarAlumno/>
          </Col>

          {/* Sección central - Lista de publicaciones */}
          <Col md={6} className="posts-section-col">
            <div className="posts-content">
              <PostListEstudiante posts={posts} addComment={addComment} />
            </div>
          </Col>

          {/* Sidebar Derecho - Contactos */}
          <Col md={3} className="sidebar-right-col">
            <Contacts />
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default Estudiante
