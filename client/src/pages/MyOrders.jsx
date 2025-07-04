// import React, { useEffect, useState } from "react";
// import { dummyOrders } from "../assets/assets";

// const MyOrders = () => {
//   const [order, setOrder] = useState([]);

//   useEffect(() => {
//     setOrder(dummyOrders);
//   }, []);

//   return (
//     <div className="mt-12 pb-16">
//       <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
//         My Orders
//       </h2>

//       {order.map((order, index) => (
//         <div
//           key={index}
//           className="my-10 border border-gray-400 rounded-lg p-10 w-full"
//         >
//           <p className="flex justify-between items-center gap-4">
//             <span>Order ID: {order._id}</span>
//             <span>Payment Type: {order.paymentType}</span>
//             <span>Total Amount: ${order.amount}</span>
//           </p>

//           {order.items.map((item, index) => (
//             <div
//               key={item._id}
//               className={`relative bg-white text-gray-800 ${
//                 order.items.length !== index + 1 && "border-b"
//               } border border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full`}
//             >
//               <div className="flex items-center gap-4 mb-4 md:mb-0">
//                 <div className="p-4 rounded-lg">
//                   <img
//                     src={item.product.image[0]}
//                     alt=""
//                     className="w-16 h-16"
//                   />
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-medium">{item.product.name}</h2>
//                   <p>{item.product.category}</p>
//                 </div>
//               </div>

//               <div className="text-lg font-medium">
//                 <p>Quantity: {item.quantity || 1}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//               </div>

//               <p className="text-lg">Amount: ${item.product.offerPrice * item.quantity}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;

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
