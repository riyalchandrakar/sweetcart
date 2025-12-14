import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  restockSweet,
} from "../controllers/sweet.controller.js";

const router = express.Router();

/**
 * =========================
 * SWEET ROUTES (CLEAN)
 * =========================
 *
 * PUBLIC:
 *   GET    /api/sweets
 *   GET    /api/sweets/search
 *
 * ADMIN:
 *   POST   /api/sweets
 *   PUT    /api/sweets/:id
 *   DELETE /api/sweets/:id
 *   POST   /api/sweets/:id/restock
 */

// PUBLIC
router.get("/", getSweets);
router.get("/search", searchSweets);

// ADMIN
router.post("/", protect, adminOnly, createSweet);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
