import "reflect-metadata";
import express from "express";
import path from "path";

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
