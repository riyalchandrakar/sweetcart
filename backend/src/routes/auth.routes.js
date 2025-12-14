import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * =========================
 * AUTH ROUTES
 * =========================
 * POST /api/auth/register → User only
 * POST /api/auth/login    → User/Admin (role aware)
 */

router.post("/register", register);
router.post("/login", login);

export default router;
