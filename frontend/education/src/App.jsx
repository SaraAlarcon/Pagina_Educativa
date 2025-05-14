import React from "react";
import {Route, Routes } from "react-router-dom";
import Docente from "./pages/Docente.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ChatsDocente from "./pages/DocenteFolder/ChatsDocente.jsx";
import ClasesDocente from "./pages/DocenteFolder/ClasesDocente.jsx";
import ClaseDetalleDocente from "./pages/DocenteFolder/ClaseDetalleDocente.jsx";
import ActvDocente from "./pages/DocenteFolder/ActvDocente.jsx";
import AsistenciaDocente from "./pages/DocenteFolder/AsistenciaDocente.jsx";


const App = () => {
  return (
    <Routes>
      <Route path="/docente" element={<Docente />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<Home />} />
      <Route path="/chats" element={<ChatsDocente/>} />
      <Route path="/clases" element={<ClasesDocente/>} />
      <Route path="/clases/:id" element={<ClaseDetalleDocente/>} />
      <Route path="/actividades" element={<ActvDocente />} />
      <Route path="/estudiantes" element={<AsistenciaDocente />} />

    </Routes>
  );
};

export default App;

