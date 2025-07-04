import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  image: { type: String, required: true }, // 👈 add this
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
