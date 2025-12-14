import Sweet from "../models/sweet.model.js";

/**
 * =========================
 * GET ALL SWEETS
 * =========================
 * ✔ Used by user dashboard
 * ✔ Used by admin dashboard
 */
export const getAllSweets = async (req, res) => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  res.json(sweets);
};

/**
 * =========================
 * ADMIN – RESTOCK SWEET
 * =========================
 * ✔ Admin only
 * ✔ Atomic increment
 */
export const restockSweet = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid restock amount" });
  }

  const sweet = await Sweet.findByIdAndUpdate(
    req.params.id,
    { $inc: { quantity: Number(amount) } },
    { new: true }
  );

  if (!sweet) {
    return res.status(404).json({
      message: "Sweet not found",
    });
  }

  res.json({
    message: "Sweet restocked successfully",
    sweet,
  });
};
