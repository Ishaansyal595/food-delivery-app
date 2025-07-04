import express from "express";
import { authUser } from "../middleware/authUser.js";
import { cartItems } from "../controllers/cartItems.controller.js";

const CartItemsRouter = express.Router();

CartItemsRouter.post("/update-cart", authUser, cartItems);

export default CartItemsRouter;
