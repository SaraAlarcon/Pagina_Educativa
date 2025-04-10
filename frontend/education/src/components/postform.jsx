"use client"

import { useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { FaImage, FaFileAlt, FaVideo, FaLink } from "react-icons/fa"
import "../stylescomponents/postform.css"

const PostForm = ({ addPost }) => {
  const [file, setFile] = useState(null)
  const [postText, setPostText] = useState("")

  const handlePost = (event) => {
    event.preventDefault()

    if (!postText.trim() && !file) return

    addPost({
      text: postText,
      file,
      date: new Date().toLocaleString(),
      author: {
        name: "Profesor Martínez",
        avatar: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
      },
    })

    setFile(null)
    setPostText("")
  }

  return (
    <Card className="post-card">
      <div className="post-card-header">
        <div className="post-author">
          <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" alt="Profile" className="author-avatar" />
          <span className="author-name">¿Qué quieres compartir hoy?</span>
        </div>
      </div>

      <Form onSubmit={handlePost}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Comparte conocimientos, recursos o novedades con tus estudiantes..."
            className="styled-textarea"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </Form.Group>

        {/* Vista previa del archivo */}
        {file && (
          <div className="file-preview">
            {file.type.startsWith("image/") ? (
              <div className="image-preview-container">
                <img src={URL.createObjectURL(file) || "/placeholder.svg"} alt="Vista previa" className="preview-img" />
                <button type="button" className="remove-file-btn" onClick={() => setFile(null)}>
                  ×
                </button>
              </div>
            ) : (
              <div className="file-info">
                <FaFileAlt className="file-icon" />
                <span className="file-name">{file.name}</span>
                <button type="button" className="remove-file-btn" onClick={() => setFile(null)}>
                  ×
                </button>
              </div>
            )}
          </div>
        )}

        <div className="post-actions">
          <div className="media-actions">
            <label htmlFor="file-upload" className="media-action-btn">
              <FaImage className="action-icon" />
              <span className="action-text">Imagen</span>
            </label>

            <label htmlFor="file-upload" className="media-action-btn">
              <FaFileAlt className="action-icon" />
              <span className="action-text">Documento</span>
            </label>

            <label htmlFor="file-upload" className="media-action-btn">
              <FaVideo className="action-icon" />
              <span className="action-text">Video</span>
            </label>

            <label className="media-action-btn">
              <FaLink className="action-icon" />
              <span className="action-text">Enlace</span>
            </label>
          </div>

          <input
            id="file-upload"
            type="file"
            className="file-input"
            accept="image/*,application/pdf,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button type="submit" className="publish-btn" disabled={!postText.trim() && !file}>
            Publicar
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default PostForm

