import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import ProductCard from "../ProductCard";

const BestSeller = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="my-20 flex flex-wrap ">
      <h2 className={`text-2xl md:text-3xl font-medium text-gray-800`}>
        Best Seller
      </h2>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 items-center justify-center">
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
