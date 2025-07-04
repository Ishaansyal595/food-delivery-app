import Product from "../../models/product.Schema.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const {
      productPrice,
      productCategory,
      productDescription,
      productOfferPrice,
      productName,
      productStockQuantity,
    } = req.body;

    // Convert description to array if it's not
    const parsedDescription = Array.isArray(productDescription)
      ? productDescription
      : [productDescription];

    // ✅ Upload all images to Cloudinary
    const productImage = [];

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required." });
    }

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      if (result?.secure_url) {
        productImage.push(result.secure_url);
      }
    }

    // ✅ Validate required fields
    if (
      !productImage.length ||
      !productPrice ||
      !productCategory ||
      !productName ||
      !parsedDescription.length ||
      !productOfferPrice ||
      productStockQuantity === undefined
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if product already exists
    const existingProduct = await Product.findOne({
      productName: productName.trim(),
      productCategory,
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists in this category.",
      });
    }

    // ✅ Create and save new product
    const newProduct = new Product({
      productImage,
      productPrice,
      productCategory,
      productDescription: parsedDescription,
      productOfferPrice,
      productName,
      productInStock: productStockQuantity > 0,
      productStockQuantity,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
