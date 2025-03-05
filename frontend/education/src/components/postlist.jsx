import { Card, Button } from "react-bootstrap";
import { FaClock, FaDownload } from "react-icons/fa";
import "../stylescomponents/postlist.css";

const PostList = ({ posts }) => {
  return posts.map((post, index) => (
    <Card key={index} className="post-item shadow-sm">
      <Card.Body className="post-body">
        <Card.Text className="post-text">{post.text}</Card.Text>

        {/* Mostrar imagen si es un archivo de imagen */}
        {post.file && post.file.type.startsWith("image/") ? (
          <div className="image-container">
            <img
              src={URL.createObjectURL(post.file)}
              alt="Imagen subida"
              className="uploaded-img"
            />
          </div>
        ) : post.file ? (
          // Mostrar botón de descarga si es otro tipo de archivo
          <div className="download-container">
            <a href={URL.createObjectURL(post.file)} download className="download-btn">
              <Button variant="outline-success" size="sm">
                <FaDownload /> Descargar {post.file.name}
              </Button>
            </a>
          </div>
        ) : null}

        {/* Mostrar fecha con icono */}
        <small className="text-muted d-block mt-2">
          <FaClock className="me-1" /> {post.date}
        </small>
      </Card.Body>
    </Card>
  ));
};

export default PostList;
