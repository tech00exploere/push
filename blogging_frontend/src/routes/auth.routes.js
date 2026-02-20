import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Auth Routes
router.post("/register", register); // Create a new user
router.post("/login", login);       // Login existing user

export default router;
