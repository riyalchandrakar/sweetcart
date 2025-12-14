import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * =========================
 * PROTECT – AUTH MIDDLEWARE
 * =========================
 * ✔ Verifies JWT
 * ✔ Attaches user to req
 */
export const protect = async (req, res, next) => {
  let token;

  // ✅ Safer token extraction
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⚠️ password already select:false in model
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, token failed" });
  }
};

/**
 * =========================
 * ADMIN ONLY MIDDLEWARE
 * =========================
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Admin access only" });
  }
};
