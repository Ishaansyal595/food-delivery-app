import React, { useContext, useState } from "react";
import { AppContext } from "./../../context/AppContext";
import toast from "react-hot-toast";
import Modal from "./../../UI/Modal";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const { axios, dispatch } = useContext(AppContext);

  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a category image");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName.trim());
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "/api/admin/category/add-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Category added successfully");
        setCategoryName("");
        setImageFile(null);
        navigate("/admin/add-product");
        dispatch({ type: "SET_CATEGORY_MODAL", payload: false });
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding category:", error.message);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Modal>
      <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label
            htmlFor="image"
            className="block w-full border border-dashed border-gray-400 p-2 text-center cursor-pointer mb-3 rounded"
          >
            {imageFile ? imageFile.name : "Upload Category Image"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryForm;
