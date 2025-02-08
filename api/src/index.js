import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express()
app.use(express.json())
app.use(cors())

app.use("/", userRoutes)
const port = 3001

app.listen(port, () => {
    mongoose.connect(`mongodb+srv://almeidafonseca15:Ph4M4MO1N64GNgwF@cluster.x73zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
    console.log(`Exemplo app listening na porta ${port}`)
})