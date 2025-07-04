import { authUser } from "../../middleware/authUser.js";
import { isAdminOnly } from "../../middleware/isAdminOnly.js";
import { createCategory } from "./../../controllers/admin/adminCategory.controller.js";
import upload from "../../config/multer.js";
import express from "express";

const AdminCategoryRouter = express.Router();

AdminCategoryRouter.post(
  "/add-category",
  authUser,
  isAdminOnly,
  upload.single("image"),
  createCategory
);

export default AdminCategoryRouter;
