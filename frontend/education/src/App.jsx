import React from "react";
import {Route, Routes } from "react-router-dom";
import Docente from "./pages/Docente.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ChatsDocente from "./pages/DocenteFolder/ChatsDocente.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/docente" element={<Docente />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<Home />} />
      <Route path="/chats" element={<ChatsDocente/>} />
    </Routes>
  );
};

export default App;

