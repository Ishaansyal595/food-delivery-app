import Order from "../models/order.Schema.js";
import Product from "../models/product.Schema.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId } = req.user;

    const { items, address } = req.body;

    if (!items || !address) {
      return res
        .status(404)
        .json({ success: false, message: "Items & Address are required!" });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor((amount * 2) / 100);

    const order = new Order({
      userId,
      items,
      address,
      amount,
      isPaid: false,
      paymentMethod: "COD",
    });

    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Placing Order with COD Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user;
    // const { items, address } = req.body;

    const order = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: false }]
        .populate("items.product, address")
        .sort({ createdAt: -1 }),
    });

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Placing Order with COD Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
