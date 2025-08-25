import React from "react";
import img from '../../assets/header/image.png'
const dummyOrders = [
  {
    id: 1,
    productName: "Gildean Softstyle Jersey T shirt",
    description:
      "These T-shirts are dominating the fashion scene with their unique designs and top-quality fabric. Pick your favorite now!",
    size: "XL",
    price: "$200",
    customerName: "Hridoy Hossain",
    location: "Dhaka, Bangladesh",
    postalCode: "1207",
    number: "6541212345",
    image: img,
    label: "Best Sell",
  },
  {
    id: 2,
    productName: "Gildean Softstyle Jersey T shirt",
    description:
      "These T-shirts are dominating the fashion scene with their unique designs and top-quality fabric. Pick your favorite now!",
    size: "XL",
    price: "$200",
    customerName: "Hridoy Hossain",
    location: "Dhaka, Bangladesh",
    postalCode: "1207",
    number: "6541212345",
    image: img,
    label: "Best Sell",
  },
];

const Order = () => {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {dummyOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg shadow-md p-4 flex gap-4 bg-white"
        >
          <div className="relative flex-shrink-0">
            <img
              src={order.image}
              alt={order.productName}
              className="w-28 h-28 object-cover rounded border"
            />
            {order.label && (
              <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-tr rounded-bl">
                {order.label}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-lg font-semibold">{order.productName}</h2>
              <p className="text-gray-500 text-sm mt-1">{order.description}</p>
              <p className="text-gray-700 mt-2 text-sm">
                Size: {order.size} | Price: {order.price}
              </p>
            </div>

            <div className="mt-4 border-t pt-2 text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span>{order.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Postal Code:</span>
                <span>{order.postalCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Number:</span>
                <span>{order.number}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
