"use client"

import { useState } from "react"
import { Card, Button, Form } from "react-bootstrap"
import {FaClock, FaDownload, FaThumbsUp, FaComment, FaBookmark, FaFileAlt, FaPaperPlane, } from "react-icons/fa"
import "../stylescomponents/alumnoPostform.css"

const PostListEstudiante = ({ posts, addComment }) => {
  const [commentText, setCommentText] = useState({})
  const [showComments, setShowComments] = useState({})

  const handleCommentChange = (postId, text) => {
    setCommentText({
      ...commentText,
      [postId]: text,
    })
  }

  const handleSubmitComment = (postId) => {
    if (commentText[postId]?.trim()) {
      addComment(postId, commentText[postId])
      setCommentText({
        ...commentText,
        [postId]: "",
      })
    }
  }

  const toggleComments = (postId) => {
    setShowComments({
      ...showComments,
      [postId]: !showComments[postId],
    })
  }

  if (posts.length === 0) {
    return (
      <div className="empty-posts">
        <div className="empty-icon">📝</div>
        <h3>No hay publicaciones disponibles</h3>
        <p>Aún no hay contenido para mostrar</p>
      </div>
    )
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <Card key={post.id} className="post-item">
          <Card.Body className="post-body">
            <div className="post-header">
              <div className="post-author">
                <img
                  src={post.author?.avatar || "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"}
                  alt="Author"
                  className="author-avatar"
                />
                <div className="author-info">
                  <h5 className="author-name">{post.author?.name || "Profesor"}</h5>
                  <div className="post-meta">
                    <FaClock className="meta-icon" />
                    <span className="post-date">{post.date}</span>
                  </div>
                </div>
              </div>
              <div className="post-options">
                <Button variant="link" className="options-btn">
                  <FaBookmark />
                </Button>
              </div>
            </div>

            <div className="post-content">
              <p className="post-text">{post.text}</p>

              {/* Mostrar imagen si es un archivo de imagen */}
              {post.file && post.file.type?.startsWith("image/") ? (
                <div className="image-container">
                  <img
                    src={URL.createObjectURL(post.file) || "/placeholder.svg"}
                    alt="Imagen subida"
                    className="uploaded-img"
                  />
                </div>
              ) : post.file ? (
                // Mostrar botón de descarga si es otro tipo de archivo
                <div className="download-container">
                  <a href={URL.createObjectURL(post.file)} download className="download-btn">
                    <FaFileAlt className="file-icon" />
                    <span className="file-name">{post.file.name}</span>
                    <FaDownload className="download-icon" />
                  </a>
                </div>
              ) : null}
            </div>

            <div className="post-actions">
              <Button variant="link" className="action-btn">
                <FaThumbsUp className="action-icon" />
                <span className="action-text">Me gusta</span>
              </Button>
              <Button variant="link" className="action-btn" onClick={() => toggleComments(post.id)}>
                <FaComment className="action-icon" />
                <span className="action-text">Comentar</span>
              </Button>
            </div>

            {/* Sección de comentarios */}
            {(showComments[post.id] || post.comments.length > 0) && (
              <div className="comments-section">
                {post.comments.length > 0 && (
                  <div className="comments-list">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <img
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.author}
                          className="comment-avatar"
                        />
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-date">{comment.date}</span>
                          </div>
                          <p className="comment-text">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="comment-form">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Tu avatar"
                    className="comment-avatar"
                  />
                  <div className="comment-input-container">
                    <Form.Control
                      type="text"
                      placeholder="Escribe un comentario..."
                      value={commentText[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      className="comment-input"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitComment(post.id)
                        }
                      }}
                    />
                    <Button
                      variant="link"
                      className="send-comment-btn"
                      onClick={() => handleSubmitComment(post.id)}
                      disabled={!commentText[post.id]?.trim()}
                    >
                      <FaPaperPlane />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default PostListEstudiante
