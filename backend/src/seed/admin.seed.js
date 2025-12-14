import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/user.model.js";

dotenv.config();
await connectDB();

const createAdmin = async () => {
  const email = "admin@sweetshop.com";

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("✅ Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Super Admin",
    email,
    password: "admin123",
    role: "admin",
  });

  console.log("🚀 Admin created successfully");
  process.exit();
};

createAdmin();
