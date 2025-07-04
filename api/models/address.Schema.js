import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },

    fullName: { type: String, required: true, trim: true },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
      minlength: 10,
    },

    street: { type: String, required: true, trim: true },

    city: { type: String, required: true, trim: true },

    state: { type: String, required: true, trim: true },

    zip: { type: Number, required: true, trim: true },

    country: { type: String, required: true, trim: true, default: "India" },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;
