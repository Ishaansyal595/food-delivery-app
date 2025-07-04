import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AdminProductList = () => {
  const { products } = useContext(AppContext);

  return (
    <div className="w-full flex flex-col rounded-lg bg-white">
      <h2 className="pb-4 text-lg font-medium">All Products</h2>
      <div className="flex flex-col items-center w-full rounded-md bg-white border border-gray-500/20 max-h-[400px] overflow-y-auto">
        <table className="md:table-auto table-fixed w-full overflow-hidden">
          <thead className="text-gray-900 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Product</th>
              <th className="px-4 py-3 font-semibold truncate">Category</th>
              <th className="px-4 py-3 font-semibold truncate hidden md:block">
                Selling Price
              </th>
              <th className="px-4 py-3 font-semibold truncate">In Stock</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 object-cover rounded p-2">
                      <img
                        src={product.productImage?.[0] || "/no-image.png"}
                        alt={product.productName}
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.productName}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.productCategory?.name}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    ${product.productOfferPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={product.productInStock}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  Products Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;
