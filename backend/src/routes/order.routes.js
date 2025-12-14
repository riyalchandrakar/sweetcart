import express from "express";
import {   getMyOrders , placeOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/checkout", protect, placeOrder);
router.get("/my", protect, getMyOrders);

export default router;
