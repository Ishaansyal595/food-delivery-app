import express from "express";
import { getAllCategories } from "./../controllers/category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/get-categories", getAllCategories);

export default CategoryRouter;
