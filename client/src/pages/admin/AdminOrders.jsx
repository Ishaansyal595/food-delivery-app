import React, { useEffect, useState } from "react";
import { dummyOrders } from "../../assets/assets";

const AdminOrders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [order, setOrder] = useState([]);

  useEffect(async () => {
    setOrder(dummyOrders);
  }, []);

  return (
    <div className=" p-4 space-y-4 w-full h-full">
      <h2 className="text-lg font-medium">Orders List</h2>
      {order.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 w-full rounded-md border border-gray-300 text-gray-800 hover:bg-primary/10 hover:border-primary"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover opacity-60"
              src={boxIcon}
              alt="boxIcon"
            />
            <>
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col justify-center">
                  <p className="font-medium">
                    {item.product.name}{" "}
                    <span
                      className={`text-indigo-500 ${
                        item.quantity < 2 && "hidden"
                      }`}
                    >
                      x {item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state},{order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ${order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {order.orderDate}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
