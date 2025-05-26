"use client"

import { useState, useEffect } from "react"
import { Col, Container } from "react-bootstrap"
import CustomNavbar from "../components/navbar"
import Sidebar from "../components/sidebar"
import PostForm from "../components/postform"
import PostList from "../components/postlist"
import Contacts from "../components/Contacts"
import PostsService from "../services/PostsService"
import "../styles/docente.css"

const Docente = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const token = localStorage.getItem('token')
        const teacherId = localStorage.getItem('userId')
        const postsData = await PostsService.getByTeacher(teacherId, token)
        setPosts(postsData)
      } catch (error) {
        console.error("Error al cargar publicaciones:", error)
      }
    }
    
    loadPosts()
  }, [])

  const addPost = async (newPost) => {
    try {
      const token = localStorage.getItem('token')
      const createdPost = await PostsService.create(newPost, [], token)
      setPosts([createdPost, ...posts])
    } catch (error) {
      console.error("Error al crear publicación:", error)
      throw error
    }
  }

  return (
    <div className="docente-page">
      <CustomNavbar />
      <Container fluid className="content-container">
        <div className="content-wrapper">
          <Col md={3} className="sidebar-left-col">
            <Sidebar />
          </Col>

          <Col md={6} className="posts-section-col">
            <div className="posts-content">
              <PostForm addPost={addPost} />
              <PostList posts={posts} />
            </div> 
          </Col>

          <Col md={3} className="sidebar-right-col">
            <Contacts />
          </Col>
        </div>
      </Container>
    </div>
  )
}

export default Docente;