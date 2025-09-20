import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { LoginService } from "../services/LoginServices";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [group, setGroup] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumno"
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await LoginService.register(formData);
      setIsSignUp(false);
      alert("Registro exitoso! Por favor inicia sesión.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    console.log('Intentando login con:', loginData); // Debug
    const { token, user } = await LoginService.login(loginData.email, loginData.password);
    
    console.log('Login exitoso, usuario:', user); // Debug
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.id);

    // definir role del usuario
    const role = !user.alumno && !user.docente  
      ? 'admin' : user.alumno 
      ? 'alumno' : user.docente 
      ? 'docente' : '';

    switch(role) {
      case "admin":
        window.location.href = "/admin";
        break;
      case "docente":
        window.location.href = "/docente";
        break;
      default:
        window.location.href = "/chats";
    }
  } catch (err) {
    console.error('Error en handleLogin:', {
      message: err.message,
      stack: err.stack,
      loginData
    }); // Debug detallado
    
    setError(err.message || "Error al iniciar sesión");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className={`custom-container ${isSignUp ? "active" : ""}`} id="custom-container">
      {/* Formulario de Registro */}
      <div className="custom-form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1 className="form-title">Crear Cuenta</h1>
          <div className="form-divider"></div>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <input 
            type="text" 
            name="name"
            placeholder="Nombre Completo" 
            className="custom-input" 
            value={formData.name}
            onChange={handleSignUpChange}
            required 
          />
          
          <input 
            type="email" 
            name="email"
            placeholder="Correo" 
            className="custom-input" 
            value={formData.email}
            onChange={handleSignUpChange}
            required 
          />

          <select 
            name="role"
            className="custom-input custom-select"
            value={formData.role}
            onChange={handleSignUpChange}
            style={{display: 'none'}}
          >
            <option value="alumno">Alumno</option>
          </select>

          <select 
            className="custom-input custom-select"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="" disabled>Seleccione un grupo</option>
            <option value="Group A">Group A</option>
            <option value="Group B">Group B</option>
            <option value="Group C">Group C</option>
          </select>

          <input 
            type="password" 
            name="password"
            placeholder="Contraseña" 
            className="custom-input" 
            value={formData.password}
            onChange={handleSignUpChange}
            required 
          />
          
          <button 
            type="submit" 
            className="custom-button"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>

      {/* Formulario de Inicio de Sesión */}
      <div className="custom-form-container sign-in">
        <form onSubmit={handleLogin}>
          <div className="logo-container">
            <img src="/images/symbol.png" alt="Logo" className="logo-image" />
          </div>
          <h1 className="form-title">Inicio de Sesión</h1>
          <div className="form-divider"></div>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <input 
            type="email" 
            name="email"
            placeholder="Correo" 
            className="custom-input" 
            value={loginData.email}
            onChange={handleLoginChange}
            required 
          />
          
          <input 
            type="password" 
            name="password"
            placeholder="Contraseña" 
            className="custom-input" 
            value={loginData.password}
            onChange={handleLoginChange}
            required 
          />
          
          <button 
            type="submit" 
            className="custom-button"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>

      {/* Sección de Alternar */}
      <div className="custom-toggle-container">
        <div className="custom-toggle">
          <div className="custom-toggle-panel custom-toggle-left">
            <img src="/images/logo-white.png" alt="Logo" className="logo-image2" />
            <h1>¡Bienvenido de nuevo!</h1>
            <p>Inicie sesión para obtener acceso a nuestros cursos</p>
            <button 
              className="toggle-button" 
              onClick={() => setIsSignUp(false)}
              disabled={isLoading}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="custom-toggle-panel custom-toggle-right">
            <h1>¡Hola!</h1>
            <p>Inicie sesión para acceder a nuestra plataforma</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;