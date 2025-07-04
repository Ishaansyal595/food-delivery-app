import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Container = ({ title }) => {
  const navigate = useNavigate();

  const { products, searchQuery, isAdmin } = useContext(AppContext);

  // Filter products based on stock and optional search query
  const filteredProducts = products.filter(
    (product) =>
      product.productInStock &&
      (!searchQuery ||
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="my-20">
      <div className="flex justify-between items-center ">
        <h2 className={`text-2xl md:text-3xl font-medium text-gray-800`}>
          {searchQuery ? `Results for "${searchQuery}"` : title}
        </h2>

        {isAdmin && (
          <button
            onClick={() => {
              navigate("/admin/add-product");
            }}
            className="flex justify-center items-center bg-primary py-2 px-4 text-white font-semibold gap-2 rounded-lg hover:bg-hover"
          >
            {" "}
            <IoIosAddCircleOutline /> Add Products
          </button>
        )}
      </div>

      <div className="my-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Container;
