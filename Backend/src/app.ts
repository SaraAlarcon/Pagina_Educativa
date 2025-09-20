// src/app.ts
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import { AppDataSource } from "./config/database";
import activityRoutes from "./routes/activityrouter";
import classRoutes from "./routes/classrouter";
import postRoutes from "./routes/postrouter";
import userrouter from "./routes/userrouter";
import groupRouter from './routes/grouprouter';
import teacherRoutes from "./routes/teacherrouter";
import studentRoutes from "./routes/alumnorouter";
import { ChatService } from "./services/ChatService";
import { socketAuthMiddleware } from './middlewares/authMiddleware';
import { seedAdministratorUser } from './helper/SeedToCreateAnAdministratorUser';

// Configuración Express
const app = express();
const httpServer = createServer(app);

// Configuración CORS compartida
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// Middlewares esenciales
app.use(cors(corsOptions));
app.use(express.json()); // Asegurarse de que este middleware esté antes de las rutas
app.use(express.urlencoded({ extended: true })); // Para datos de formulario

// Configuración Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*" // Ajusta en producción
  }
});

io.use(socketAuthMiddleware);
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.data.user.email}`);
  // Tu lógica existente de conexión WebSocket
  // Ahora puedes acceder al usuario autenticado con:
  // const userId = socket.data.user.id;
  // const userEmail = socket.data.user.email;
});

// Rutas base
app.use("/api/activities", activityRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userrouter);
app.use('/api/group', groupRouter);

// Inicialización de la base de datos
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    
    // Crear usuario administrador
    await seedAdministratorUser();
    
    // Iniciar servicio de chat después de la BD
    new ChatService(io);
    
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

export { app, io };