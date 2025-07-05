import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { user, cartItem, address, totalAmount, axios } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post("/api/orders/create", {
        user: user._id,
        address,
        products: cartItem,
        totalAmount,
        paymentMethod: "Cash on Delivery",
      });
      navigate(`/orders/${res.data._id}`);
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Shipping Address:</h3>
        <p>
          {address?.fullName}, {address?.street}, {address?.city},{" "}
          {address?.state} - {address?.pin}
        </p>
        <p>Phone: {address?.phone}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Items:</h3>
        {Object.values(cartItem).map(({ product, quantity }) => (
          <div key={product._id} className="flex justify-between">
            <p>
              {product.productName} x {quantity}
            </p>
            <p>₹{product.productPrice * quantity}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-medium">Total: ₹{totalAmount}</h3>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;
