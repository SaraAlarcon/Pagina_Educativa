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

// Configuración Express
const app = express();
const httpServer = createServer(app);

// Configuración de CORS (compartida para Express y Socket.io)
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Configuración de Socket.io
const io = new Server(httpServer, {
  cors: corsOptions
});

// Inicializar servicio de chat
new ChatService(io);

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/activities", activityRoutes);
app.use("/api/class", classRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userrouter);
app.use('/groups', groupRouter);

// Initialize database
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    
    httpServer.listen(3000, () => {
      console.log("Server with WebSockets running on port 3000");
    });
  })
  .catch((error) => console.log("Database connection error:", error));

export { app, io };