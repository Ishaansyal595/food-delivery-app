import jwt from "jsonwebtoken";
import User from "../models/user.Schema.js";

export const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ now req.user has all fields like isAdmin
    next();
  } catch (error) {
    console.log("Authentication error", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
