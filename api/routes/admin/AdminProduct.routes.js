import express from "express";
import { addProduct } from "../../controllers/admin/product.controller.js";
import { authUser } from "../../middleware/authUser.js";
import { isAdminOnly } from "../../middleware/isAdminOnly.js";
import upload from "../../config/multer.js";

const AdminProductRouter = express.Router();

AdminProductRouter.post(
  "/add-product",
  authUser,
  isAdminOnly,
  upload.array("image"),
  addProduct
);

export default AdminProductRouter;
