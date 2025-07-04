import express from "express";
import { isAdminOnly } from "../../middleware/isAdminOnly.js";
import { getAllOrders } from "./../../controllers/admin/order.controller.js";

const AdminOrderRouter = express.Router();

AdminOrderRouter.get("/all-orders", isAdminOnly, getAllOrders);

export default AdminOrderRouter;
