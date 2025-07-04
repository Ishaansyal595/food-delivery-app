import express from "express";
import {
  getAllProducts,
  getProductByCategories,
  getProductDetails,
} from "../controllers/userProduct.controller.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/category/:categoryName", getProductByCategories);
ProductRouter.get("/:prodId", getProductDetails);

export default ProductRouter;
