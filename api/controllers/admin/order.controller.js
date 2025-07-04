import Order from "../../models/order.Schema.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { isPaid: true }]
        .populate("items.product, address")
        .sort({ createdAt: -1 }),
    });

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully!", orders });
  } catch (error) {
    console.error("Placing Order with COD Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
