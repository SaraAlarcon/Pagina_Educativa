import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [group, setGroup] = useState("");

  return (
    <div className={`custom-container ${isSignUp ? "active" : ""}`} id="custom-container">
      
      {/* Formulario de Registro */}
      <div className="custom-form-container sign-up">
        <form onSubmit={(e) => e.preventDefault()}>
          
          <h1 className="form-title">Crear Cuenta</h1>
          <div className="form-divider"></div>
          <input type="text" placeholder="Nombres" className="custom-input" required />
          <input type="text" placeholder="Apellidos" className="custom-input" required />
          <input type="email" placeholder="Correo" className="custom-input" required />

          {/* ComboBox para Grupo */}
          <select 
            className="custom-input custom-select"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione un grupo</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
            <option value="Group C">Group C</option>
          </select>

          <input type="password" placeholder="Contraseña" className="custom-input" required />
          <button type="submit" className="custom-button">Registrarse</button>
        </form>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <div className="custom-form-container sign-in">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="logo-container">
            {
              <img src="/images/symbol.png" alt="Logo" className="logo-image" />
            }
          </div>
          <h1 className="form-title">Inicio de Sesión</h1>
          <div className="form-divider"></div>
          <input type="email" placeholder="Correo" className="custom-input" required />
          <input type="password" placeholder="Contraseña" className="custom-input" required />
          <a href="#" className="forgot-password">¿Olvidó la contraseña?</a>
          <button type="submit" className="custom-button">Iniciar Sesión</button>
        </form>
      </div>

      {/* Sección de Alternar */}
      <div className="custom-toggle-container">
        <div className="custom-toggle">
          <div className="custom-toggle-panel custom-toggle-left">
          <img src="/images/logo-white.png" alt="Logo" className="logo-image2" />
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Inicie sesión para obtener acceso a nuestros cursos</p>
            <button className="toggle-button" onClick={() => setIsSignUp(false)}>Iniciar Sesión</button>
          </div>
          <div className="custom-toggle-panel custom-toggle-right">
            <h1>¡Hola!</h1>
            <p>Regístrese para obtener acceso a nuestros cursos</p>
            <button className="toggle-button" onClick={() => setIsSignUp(true)}>Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
