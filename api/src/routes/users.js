import express from "express";
import { addUser, deleteUser, getUsers, updateUser, getUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.get("/:id", getUser)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router