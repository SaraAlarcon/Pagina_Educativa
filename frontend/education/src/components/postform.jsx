import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa"; // Importar icono de subida
import "../stylescomponents/postform.css";

const PostForm = ({ addPost }) => {
  const [file, setFile] = useState(null);

  const handlePost = (event) => {
    event.preventDefault();
    const text = event.target.elements.postText.value.trim();

    if (!text && !file) return;

    addPost({ text, file, date: new Date().toLocaleString() });

    setFile(null);
    event.target.reset();
  };

  return (
    <Card className="post-card">
      <h5>Crear publicación</h5>
      <Form onSubmit={handlePost}>
        {/* 📝 Área de texto */}
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            name="postText"
            placeholder="¿Qué estás pensando?"
            className="styled-textarea"
          />
        </Form.Group>

        {/* 📂 Botón para subir archivos */}
        <div className="file-upload-container">
          <label htmlFor="file-upload" className="file-upload-label">
            <FaUpload className="upload-icon" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="file-input"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* 🎞 Vista previa del archivo */}
        {file && (
          <div className="file-preview">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Vista previa"
                className="preview-img"
              />
            ) : (
              <p className="text-muted">{file.name}</p>
            )}
          </div>
        )}

        {/* 🟢 Botón de publicar */}
        <div className="text-center mt-3">
          <Button type="submit" variant="success">
            Publicar
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PostForm;
