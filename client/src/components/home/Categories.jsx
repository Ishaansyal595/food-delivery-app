import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { categories } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="mt-20">
      <h2 className={`text-2xl md:text-3xl font-medium text-gray-800`}>
        Categories
      </h2>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                navigate(`/products/${category.name.toLowerCase()}`);
                scrollTo(0, 0);
              }}
              className={`group cursor-pointer p-5 rounded-lg flex flex-col items-center gap-2 justify-center`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${category.image}`}
                alt={category.name}
                className="max-w-28 h-40 group-hover:scale-110 object-cover transition duration-300"
              />
            </div>
          ))
        ) : (
          <p>Loading Categories...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
