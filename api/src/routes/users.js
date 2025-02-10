import express from "express";
import { addUser, deleteUser, getUsers, updateUser, getFilteredUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.get("/filter", getFilteredUsers);

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router