import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
    console.log("REGISTER HIT", req.body);

  try {
    const { name, email, password } = req.body;

    // 🔒 Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Email already used" });
    }

    await User.create({
      name,
      email,
      password,
      role: "user",
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }

    if (role && user.role !== role) {
      return res.status(403).json({
        message: `Access denied. Please login as ${user.role}`,
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
};
