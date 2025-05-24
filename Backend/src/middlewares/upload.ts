// src/middleware/upload.ts
import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB (aumentado)
const ALLOWED_FILE_TYPES = [
  "image/png",
  "application/pdf",
  "application/zip",
  "application/x-rar-compressed",
  "application/vnd.ms-powerpoint", 
  "video/mp4",
  "text/plain"
];

// Configuración optimizada
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Solo se permiten: ${ALLOWED_FILE_TYPES.join(', ')}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 5 // Hasta 5 archivos por post (ajustable)
  }
});

export const handleUploadError = (err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Error al subir archivo(s)"
    });
  }
  next();
};