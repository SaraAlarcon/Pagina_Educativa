import { useState } from "react";
import {Col, Container } from "react-bootstrap";
import CustomNavbar from "../components/navbar";
import Sidebar from "../components/sidebar";  
import PostForm from "../components/postform";
import PostList from "../components/postlist";
import Contacts from "../components/Contacts"; 
import '../styles/docente.css';

const Docente = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      <CustomNavbar />
      <Container className="content-container">
          {/* Sidebar Izquierdo - Opciones */}
          <Col md={3} className="sidebar-left d-block col-1 col-md-3">
            <Sidebar />
          </Col>

          {/* Sección central - Crear publicación y lista de publicaciones */}
          <Col md={6} className="posts-section d-block col-6 col-md-6">
            <PostForm addPost={addPost} />
            <PostList posts={posts} />
          </Col>

          {/* Sidebar Derecho - Noticias */}
          <Col md={3} className="sidebar-right d-block col-1 col-md-3">
          <Contacts />
          </Col>
      </Container>
    </>
  );
};

export default Docente;
