import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

// 1. Carga configuraciones ENV
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 2. Función de validación
function getRequiredEnv(varName: string): string {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`❌ Variable de entorno requerida faltante: ${varName}`);
  }
  return value;
}

// 3. Configuración con validación
export const AppDataSource = new DataSource({
  type: "mysql",
  host: getRequiredEnv("DB_HOST"),
  port: parseInt(getRequiredEnv("DB_PORT")),
  username: getRequiredEnv("DB_USERNAME"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_DATABASE"),
  entities: [path.join(__dirname, "../entities/*.{js,ts}")],
  synchronize: false,
  logging: true,
});