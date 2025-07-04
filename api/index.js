import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// import Routes
import UserRoute from "./routes/user.routes.js";
import ProductRouter from "./routes/product.routes.js";
import MailRouter from "./routes/Mailer.route.js";
import CartItemsRouter from "./routes/cartItems.routes.js";
import UserOrderRouter from "./routes/order.routes.js";
import AdminOrderRouter from "./routes/admin/AdminOrder.routes.js";
import AdminProductRouter from "./routes/admin/AdminProduct.routes.js";
import AddressRouter from "./routes/address.routes.js";
import AdminCategoryRouter from "./routes/admin/AdminCategory.routes.js";
import CategoryRouter from "./routes/category.routes.js";

// config
import { connectDB } from "./config/connectDB.js";
import CloudinaryConnect from "./config/cloudinary.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

CloudinaryConnect();

const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Routes
app.use("/api/users", UserRoute);

app.use("/api/users/cart", CartItemsRouter);

app.use("/api/users/order", UserOrderRouter);

app.use("/api/users/products", ProductRouter);

app.use("/api/users/address", AddressRouter);

app.use("/api/users/category", CategoryRouter);

app.use("/api/admin/products", AdminProductRouter);

app.use("/api/admin/order", AdminOrderRouter);

app.use("/api/admin/category", AdminCategoryRouter);

app.use("/api/public", MailRouter);

// ✅ Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
