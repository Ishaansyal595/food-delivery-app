import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ProductCard from "../ProductCard";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="my-20">
      <h2 className={`text-2xl md:text-3xl font-medium text-gray-800`}>
        Best Seller
      </h2>

      <div className="my-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products
          .filter((product) => product.productInStock === true)
          .slice(0, 5)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
