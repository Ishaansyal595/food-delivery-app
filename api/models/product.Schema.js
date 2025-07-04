import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    productImage: {
      type: [String],
      required: true,
      validate: [(array) => array.length > 0, "At least one image is required"],
    },

    productPrice: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },

    productOfferPrice: {
      type: Number,
      required: true,
      min: [0, "Offer price must be a positive number"],
      validate: {
        validator: function (val) {
          return val <= this.productPrice;
        },
        message: "Offer price must be less than or equal to product price",
      },
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Product name must be under 100 characters"],
    },

    productDescription: {
      type: [String],
      required: true,
      validate: [
        {
          validator: (descArray) => descArray.length > 0,
          message: "At least one description is required",
        },
        {
          validator: (descArray) =>
            descArray.every(
              (desc) =>
                typeof desc === "string" &&
                desc.trim().length > 0 &&
                desc.length <= 1000
            ),
          message:
            "Each description must be a non-empty string under 1000 characters",
        },
      ],
    },

    productInStock: {
      type: Boolean,
      required: true,
      default: false,
    },

    productStockQuantity: {
      type: Number,
      required: true,
      min: [0, "Stock quantity cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
