import express from "express";
import { authUser } from "../middleware/authUser.js";
import {
  getUserOrders,
  placeOrderCOD,
} from "../controllers/order.controller.js";

const UserOrderRouter = express.Router();

UserOrderRouter.post("/cod", authUser, placeOrderCOD);

UserOrderRouter.get("/order", authUser, getUserOrders);

export default UserOrderRouter;
