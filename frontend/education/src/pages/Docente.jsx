"use client"

import { useState } from "react"
import { Col, Container } from "react-bootstrap"
import CustomNavbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import PostForm from "../components/postform"
import PostList from "../components/postlist"
import Contacts from "../components/Contacts"
import "../styles/docente.css"

const Docente = () => {
  const [posts, setPosts] = useState([])

  const addPost = (newPost) => {
    setPosts([newPost, ...posts])
  }

  return (
    <div className="docente-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          {/* Sidebar Izquierdo - Opciones */}
          <Col md={3} className="sidebar-left-col">
            <Sidebar />
          </Col>

          {/* Sección central - Crear publicación y lista de publicaciones */}
          <Col md={6} className="posts-section-col">
            <div className="posts-content">
              <PostForm addPost={addPost} />
              <PostList posts={posts} />
            </div> 
          </Col>

          {/* Sidebar Derecho - notificaciones */}
          <Col md={3} className="sidebar-right-col">
            <Contacts />
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default Docente

