import Sweet from "../models/sweet.model.js";

/* =================================================
   ADMIN – CREATE SWEET
================================================= */
export const createSweet = async (req, res) => {
  const { name, category, price, quantity, image } = req.body;

  if (!name || !category || price == null || !image) {
    return res.status(400).json({
      message: "All fields (name, category, price, image) are required",
    });
  }

  const sweet = await Sweet.create({
    name,
    category,
    price,
    quantity: quantity ?? 0,
    image,
  });

  res.status(201).json(sweet);
};

/* =================================================
   PUBLIC – GET ALL SWEETS
================================================= */
export const getSweets = async (req, res) => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  res.json(sweets);
};

/* =================================================
   PUBLIC – SEARCH / FILTER
================================================= */
export const searchSweets = async (req, res) => {
  const { name, category, maxPrice } = req.query;

  const query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = { $regex: category, $options: "i" };
  if (maxPrice) query.price = { $lte: Number(maxPrice) };

  const sweets = await Sweet.find(query).sort({ createdAt: -1 });
  res.json(sweets);
};

/* =================================================
   ADMIN – UPDATE SWEET
================================================= */
export const updateSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.name = req.body.name ?? sweet.name;
  sweet.category = req.body.category ?? sweet.category;
  sweet.price = req.body.price ?? sweet.price;
  sweet.quantity = req.body.quantity ?? sweet.quantity;
  sweet.image = req.body.image ?? sweet.image;

  const updatedSweet = await sweet.save();
  res.json(updatedSweet);
};

/* =================================================
   ADMIN – DELETE SWEET
================================================= */
export const deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  await sweet.deleteOne();
  res.json({ message: "Sweet deleted successfully" });
};

/* =================================================
   ADMIN – RESTOCK SWEET
================================================= */
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
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json({
    message: "Sweet restocked successfully",
    sweet,
  });
};
