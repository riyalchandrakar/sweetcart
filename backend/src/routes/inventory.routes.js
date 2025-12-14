import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import {
  getAllSweets,
  restockSweet,
} from "../controllers/sweet.controller.js";

const router = express.Router();

/**
 * =========================
 * SWEET ROUTES (CLEAN)
 * =========================
 * GET  /api/sweets           → PUBLIC / USER
 * POST /api/sweets/:id/restock → ADMIN
 */

// fetch sweets
router.get("/", getAllSweets);

// admin restock
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
