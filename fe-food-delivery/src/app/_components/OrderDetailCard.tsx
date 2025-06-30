import { Button } from "@/components/ui/button";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { OrderType } from "./OrderDetail";

export const OrderDetailCard = ({
  foodName,
  image,
  ingredients,
  index,
  price,
  increaseQty,
  decreaseQty,
  deleteOrder,
  id,
  addcount,
}: OrderType) => {
  return (
    <div>
      <div className=" w-full  flex  p-2 gap-4 border-b-2 border-dashed mb-2 bg-amber-200 container ">
        <Image
          src={image}
          alt="op"
          width={200}
          height={200}
          className="w-1/2 rounded-2xl"
        />
        <div className="mb-3">
          <div className="flex justify-between container p-2 ">
            <p className="text-red-500 text-2xl">{foodName}</p>
            <button
              value={index}
              onClick={() => deleteOrder(id)}
              className="w-[30px] h-[30px] rounded-full border border-solid border-red-400 text-red-500"
            >
              X
            </button>
          </div>
          <p>{ingredients}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2 items-center ">
              <Button
                onClick={() => decreaseQty(index)}
                className="rounded-full bg-white text-black hover:bg-primary-none border border-gray-300"
                size="icon"
              >
                -
              </Button>
              <p>{addcount}</p>
              <Button
                onClick={() => increaseQty(index)}
                className="rounded-full bg-white  text-black hover:bg-primary-none border border-gray-300"
                size="icon"
              >
                +
              </Button>
            </div>
            <div>
              <p>{price}₮</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
