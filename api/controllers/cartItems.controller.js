import User from "../models/user.Schema.js";

export const cartItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const { cartItem } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { cartItem },
      { new: true }
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully!",
      user: updateUser,
    });
  } catch (error) {
    console.error("Cart Items Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
