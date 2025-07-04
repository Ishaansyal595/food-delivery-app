import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductsCategoryDetails = () => {
  const { products, categories } = useContext(AppContext);
  const { category } = useParams();

  const searchCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );

  const filterProducts = products.filter(
    (prod) =>
      prod.productCategory?.name?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="mt-16">
      {searchCategory ? (
        <div className="flex flex-col ">
          <h1 className={`text-xl font-bold text-gray-800`}>
            Category: {searchCategory.name.toUpperCase()}
          </h1>
          <p className="text-sm text-gray-500">{filterProducts.length} items</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {filterProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-red-500 text-xl">Category Not Found</h1>
      )}
    </div>
  );
};

export default ProductsCategoryDetails;
