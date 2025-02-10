import express from "express";
import { deleteUser, getUsers, updateUser, registerUser, loginUser, getUsersById } from "../controllers/user.js";
import jwt from "jsonwebtoken";

function ckeckToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Acesso negado" })
    }

    try {
        const secret = process.env.SECRET
        const tokem = jwt.verify(token, secret)
        console.log(tokem)
        next()

    } catch (error) {
        res.status(400).json({ message: "Token inválido!" });
    }
}

const router = express.Router()

router.get("/users", getUsers)

router.get("/users/:id", ckeckToken, getUsersById)

router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router