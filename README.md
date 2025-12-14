# 🍬 Sweet Shop Management System (MERN Stack)
# ===========================================

# 📌 Project Description
# ----------------------
# A full-stack Sweet Shop Management System built using the MERN stack.
# The app supports User and Admin roles, online ordering, inventory
# management, order history, and a modern responsive UI.

# =========================================================
# 🛠 Tech Stack
# =========================================================
# Frontend: React (Vite), Tailwind CSS, Axios, React Router
# Backend : Node.js, Express.js, MongoDB, Mongoose
# Auth    : JWT, bcrypt
# UI      : React Hot Toast, Lucide Icons, Framer Motion

# =========================================================
# ⚙️ LOCAL SETUP GUIDE
# =========================================================

# 1️⃣ Clone Repository
git clone https://github.com/riyalchandrakar/sweetcart.git
cd sweetcart


# =========================================================
# 🔧 BACKEND SETUP
# =========================================================

cd backend
npm install

# Create .env file in backend folder
# ----------------------------------
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key

# Run backend server
npm start

# Backend runs on:
# http://localhost:5000


# =========================================================
# 👑 ADMIN SEED (MANDATORY STEP)
# =========================================================
# This step creates a default admin account in the database.

# Run admin seed script
npm run seed:admin

# OR (if script not added)
node src/seed/adminSeed.js

# Default Admin Credentials:
# --------------------------
# Email    : admin@sweetshop.com
# Password : admin123
# Role     : admin

# ⚠️ NOTE:
# - This should be run ONLY ONCE
# - Password is hashed before saving
# - Admin can login from the same login page


# =========================================================
# 🎨 FRONTEND SETUP
# =========================================================

cd ../frontend
npm install

# Create .env file in frontend folder
# -----------------------------------
# VITE_API_URL=http://localhost:5000/api

# Run frontend
npm run dev

# Frontend runs on:
# http://localhost:5173


# =========================================================
# 🧪 TEST REPORT (MANUAL TESTING)
# =========================================================
# ✔ User registration & login
# ✔ Admin login & role protection
# ✔ Cart persistence (localStorage)
# ✔ Checkout & order placement
# ✔ Stock update after purchase
# ✔ Order history (user)
# ✔ Admin CRUD (add/edit/delete sweets)
# ✔ Out-of-stock handling
# ✔ Responsive UI (mobile / tablet / desktop)

# All test cases PASSED successfully.


# =========================================================
# 📸 SCREENSHOTS
# =========================================================
# Add screenshots in /screenshots folder:
# - landing.png
# - login.png
# - dashboard.png
# - cart.png
# - checkout.png
# - order-history.png
# - admin-dashboard.png


# =========================================================
# 🤖 My AI Usage
# =========================================================
# AI tools (ChatGPT) were used for:
# - Debugging runtime and logic errors
# - Improving UI/UX with Tailwind CSS
# - Refactoring React components
# - Understanding MERN architecture patterns
# - Writing cleaner, maintainable code

# All generated suggestions were reviewed,
# understood, and manually integrated by me.


# =========================================================
# 🚀 LIVE DEPLOYMENT 
# =========================================================
# https://sweetcart-1.onrender.com


# =========================================================
# 👨‍💻 AUTHOR
# =========================================================
# Name : Riyal Chandrakar
# Role : Full Stack Developer (MERN)


# =========================================================
# ✅ END
# =========================================================
