import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCategoryForm from "./../../components/seller/AddCategoryForm";

const AdminAddProduct = () => {
  const { dispatch, axios, categoryModal } = useContext(AppContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productPrice: 0,
    productOfferPrice: 0,
    productStockQuantity: 0,
    productInStock: false,
    images: [],
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/users/category/get-categories");
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Error loading categories", err.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : [
              "productPrice",
              "productOfferPrice",
              "productStockQuantity",
            ].includes(id)
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, file],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submissionData = new FormData();
      submissionData.append("productName", formData.productName);
      submissionData.append("productCategory", formData.productCategory);
      submissionData.append("productDescription", formData.productDescription);
      submissionData.append("productPrice", formData.productPrice);
      submissionData.append("productOfferPrice", formData.productOfferPrice);
      submissionData.append(
        "productStockQuantity",
        formData.productStockQuantity
      );
      
      submissionData.append("productInStock", formData.productInStock);

      formData.images.forEach((img) => {
        submissionData.append("image", img);
      });

      const res = await axios.post(
        "/api/admin/products/add-product",
        submissionData
      );

      dispatch({ type: "SET_PRODUCT", payload: res.data.product });
      toast.success("Product added!");
      navigate("/admin");

      setFormData({
        productName: "",
        productCategory: "",
        productDescription: "",
        productPrice: 0,
        productOfferPrice: 0,
        productStockQuantity: 0,
        productInStock: false,
        images: [],
      });
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center rounded-lg bg-white">
      <form
        onSubmit={handleSubmit}
        className="h-130 pr-10 overflow-y-auto space-y-5 w-full"
      >
        <div>
          <div className="flex justify-between items-center">
            <p className="text-base font-medium">Product Image</p>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "SET_CATEGORY_MODAL", payload: true });
              }}
              className="flex justify-center items-center bg-primary py-2 px-4 text-white font-semibold gap-2 rounded-lg hover:bg-hover"
            >
              <IoIosAddCircleOutline /> Add Category
            </button>
            {categoryModal && <AddCategoryForm />}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    name="image"
                    hidden
                    onChange={handleImageChange}
                  />
                  <img
                    className="w-52 h-40 object-cover cursor-pointer rounded"
                    src={
                      formData.images[index]
                        ? URL.createObjectURL(formData.images[index])
                        : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="uploadArea"
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-base font-medium" htmlFor="productName">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Type here"
            className="outline-none w-full py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-base font-medium" htmlFor="productDescription">
            Product Description
          </label>
          <textarea
            id="productDescription"
            rows={4}
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full outline-none py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="productCategory">
            Category
          </label>
          <select
            id="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="productPrice">
              Product Price
            </label>
            <input
              id="productPrice"
              type="number"
              value={formData.productPrice}
              onChange={handleChange}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium"
              htmlFor="productOfferPrice"
            >
              Offer Price
            </label>
            <input
              id="productOfferPrice"
              type="number"
              value={formData.productOfferPrice}
              onChange={handleChange}
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 w-32">
          <label
            className="text-base font-medium"
            htmlFor="productStockQuantity"
          >
            Stock Quantity
          </label>
          <input
            id="productStockQuantity"
            type="number"
            value={formData.productStockQuantity}
            onChange={handleChange}
            placeholder="0"
            className="outline-none py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex-1 flex gap-2 items-center w-32">
          <label className="text-base font-medium" htmlFor="productInStock">
            In Stock
          </label>
          <input
            id="productInStock"
            type="checkbox"
            checked={formData.productInStock}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
