import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },

    cartItem: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    // address: {
    //   type: String,
    //   required: [true, "Address is required"],
    //   trim: true,
    // },
  },
  { minimize: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
