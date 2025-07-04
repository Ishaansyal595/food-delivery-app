import Category from "./../../models/category.Schema.js";

export const createCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim().toLowerCase();
    const image = req.file;

    if (!name || !image) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    const existing = await Category.findOne({ name });

    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Category already exists" });
    }

    // ✅ Use file.path or just the filename to store
    const imagePath = image.path.replace(/\\/g, "/"); // fix Windows backslashes

    const category = new Category({ name, image: imagePath });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.error("Create category error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
