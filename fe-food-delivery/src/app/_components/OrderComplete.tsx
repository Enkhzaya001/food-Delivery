"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CartEmpty } from "./CartEmpty";
import { OrderCompleteLoading } from "./OrderCompleteLoading";

type OrderType = {
  _id: string;
  address: string;
  createdAt: string;
  status: string;
  totalPrice: number;
  foodOrderItems: {
    food: {
      foodName: string;
      price: number;
    };
    quantity: number;
  }[];
};
export const OrderComplete = () => {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const result = await axios.get(
          "https://food-delivery-be-food-delivery.onrender.com/getOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result, "orderdata");
        setOrderData(result.data.order);
      } catch (error) {
        console.error("Order data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  console.log(orderData, "ff");
  return (
    <>
      {isLoading ? (
        <OrderCompleteLoading />
      ) : (
        <div>
          {orderData.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <div className="bg-white p-4 rounded-2xl shadow-md w-[370px] mx-auto space-y-6">
                <h2 className="text-lg font-bold">Order history</h2>
                {orderData.map((order) => (
                  <div
                    key={order._id}
                    className="space-y-2 border-b border-dashed border-gray-300 pb-4 last:border-none"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg">
                        ${Number(order.totalPrice / 100).toFixed(2)}
                        <span className="text-gray-500 text-sm">
                          #{order._id.slice(-5)}
                        </span>
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "PENDING"
                            ? "text-red-500 border border-red-300"
                            : "text-gray-700 bg-gray-100"
                        }`}
                      >
                        {order.status === "PENDING" ? "Pending" : "Delivered"}
                      </span>
                    </div>

                    <div className="text-gray-600 text-sm space-y-1">
                      {order?.foodOrderItems?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <p>🤩 {item?.food?.foodName}</p>
                          <span>x {item.quantity}</span>
                        </div>
                      ))}

                      <div className="flex items-center gap-1">
                        <span>⏰</span>
                        <p>
                          {new Date(order.createdAt).toISOString().slice(0, 10)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <p className="truncate">{order.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
