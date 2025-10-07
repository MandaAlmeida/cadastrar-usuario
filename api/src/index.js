import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conexão com o MongoDB estabelecida com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);

export default app;
