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
          <h1>Crear Cuenta</h1>
          <span></span>
          <input type="text" placeholder="Nombres" className="form-control my-2" required />
          <input type="text" placeholder="Apellidos" className="form-control my-2" required />
          <input type="email" placeholder="Correo" className="form-control my-2" required />

          {/* ComboBox para Grupo */}
          <select 
            className="form-control my-2"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione un grupo</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
            <option value="Group C">Group C</option>
          </select>

          <input type="password" placeholder="Contraseña" className="form-control my-2" required />
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <div className="custom-form-container sign-in">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Inicio de Sesion</h1>
          <span></span>
          <input type="email" placeholder="Correo" className="form-control my-2" required />
          <input type="password" placeholder="Contraseña" className="form-control my-2" required />
          <a href="#" className="d-block text-center">Olvido la contraseña?</a>
          <button type="submit" className="btn btn-success w-100">Iniciar Sesion</button>
        </form>
      </div>

      {/* Sección de Alternar */}
      <div className="custom-toggle-container">
        <div className="custom-toggle">
          <div className="custom-toggle-panel custom-toggle-left">
            <h1>Bienvenido de nuevo!</h1>
            <p>Inicie sesion para obtener el acceso a nuestros servicios</p>
            <button className="hidden btn btn-success" onClick={() => setIsSignUp(false)}>Inicio de Sesion</button>
          </div>
          <div className="custom-toggle-panel custom-toggle-right">
            <h1>Hola!</h1>
            <p>Registrese para obtener el acceso a nuestros servicios</p>
            <button className="hidden btn btn-success" onClick={() => setIsSignUp(true)}>Registrarse</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
