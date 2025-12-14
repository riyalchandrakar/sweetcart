// controllers/orderController.js
import Sweet from "../models/sweet.model.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user._id;

    let totalAmount = 0;

    // ✅ STOCK CHECK
    for (const item of items) {
      const sweet = await Sweet.findById(item._id);

      if (!sweet || sweet.quantity < item.qty) {
        return res.status(400).json({
          message: `${item.name} is out of stock`,
        });
      }

      totalAmount += sweet.price * item.qty;
    }

    // ✅ UPDATE STOCK
    for (const item of items) {
      await Sweet.findByIdAndUpdate(item._id, {
        $inc: { quantity: -item.qty },
      });
    }

    // ✅ SAVE ORDER
    const order = await Order.create({
      user: userId,
      items: items.map((i) => ({
        sweet: i._id,
        qty: i.qty,
        price: i.price,
      })),
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Order failed",
    });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.sweet", "name image price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch order history",
    });
  }
};
