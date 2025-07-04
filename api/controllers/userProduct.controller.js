import Category from "../models/category.Schema.js";
import Product from "../models/product.Schema.js";

export const getAllProducts = async (req, res, newt) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("productCategory"); // ✅ populate category name

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetails = async (req, res, newt) => {
  try {
    const { prodId } = req.params;

    const products = await Product.findById({ prodId });

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCategories = async (req, res, newt) => {
  try {
    const { name } = req.params;

    // 1. Find category by name
    const category = await Category.findOne({ name });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // 2. Find products with that category's _id
    const products = await Product.find({
      productCategory: category._id,
    }).populate("productCategory");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
