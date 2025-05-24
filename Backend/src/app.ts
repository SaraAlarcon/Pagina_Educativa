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
import { ChatService } from "./services/ChatService";
import { socketAuthMiddleware } from './middlewares/authMiddleware';

// Configuración Express
const app = express();
const httpServer = createServer(app);

// Configuración CORS compartida
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// Configuración Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*" // Ajusta en producción
  }
});
// Middlewares esenciales
app.use(cors(corsOptions));
app.use(express.json());
io.use(socketAuthMiddleware); // Aplica el middleware
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.data.user.email}`);
  // Tu lógica existente de conexión WebSocket
  // Ahora puedes acceder al usuario autenticado con:
  // const userId = socket.data.user.id;
  // const userEmail = socket.data.user.email;
});
// Rutas base
app.use("/api/activities", activityRoutes);
app.use("/api/class", classRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userrouter);
app.use('/api/groups', groupRouter);

// Inicialización de la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    
    // Iniciar servicio de chat después de la BD
    new ChatService(io);
    
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

export { app, io };