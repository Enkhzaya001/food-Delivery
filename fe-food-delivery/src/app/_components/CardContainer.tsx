"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FoodDetail } from "./foodDetail";
import { FoodSkeletonList } from "./FoodSkelton";
import { Foods } from "../page";
import axios from "axios";

export type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

// type PropsType = {
//   foods: {
//     [key: string]: FoodProps[];
//   };
// };

export const CardContainer = () => {
  const [foods, setFoods] = useState<Foods | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const datafetch = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching foods from API...");

        const result = await axios.get(
          "https://food-delivery-be-food-delivery.onrender.com/foods"
        );

        console.log("API Response:", result.data);
        console.log("Foods data:", result.data.foods);

        if (result.data.foods && typeof result.data.foods === "object") {
          setFoods(result.data.foods as Foods);
          console.log("Foods set successfully:", result.data.foods);
        } else {
          console.error("Invalid foods data structure:", result.data);
          setError("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Failed to fetch foods:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch foods"
        );
      } finally {
        setLoading(false);
      }
    };

    datafetch();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-400">
        <FoodSkeletonList />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>料理読み込みエラー: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          再試行
        </button>
      </div>
    );
  }

  if (!foods || Object.keys(foods).length === 0) {
    return (
      <div className="text-center mt-10 text-gray-400">
        <p>料理がありません</p>
      </div>
    );
  }

  const keys = Object.keys(foods).map((key) => key.trim());
  return (
    <div className="bg-[#360202] p-5">
      {keys.toSorted().map((category) => (
        <div key={category} className="mb-10">
          <h2 className="pb-6 pt-5 text-white font-bold text-2xl">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {foods[category].slice(0, 6).map((food, index) => (
              <div
                key={index}
                className="w-full max-w-[400px] bg-red-900 rounded-2xl flex justify-center items-center p-6"
              >
                <div className="w-full relative">
                  <Image
                    src={food.image}
                    alt={food.foodName}
                    width={365}
                    height={210}
                    className="w-full h-[210px] object-cover rounded-2xl"
                  />
                  <FoodDetail
                    id={food._id}
                    foodName={food.foodName}
                    image={food.image}
                    ingredients={food.ingredients}
                    price={food.price}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-[24px] text-red-100 font-semibold">
                      {food.foodName}
                    </p>
                    <p className="text-[20px] font-semibold text-red-100">
                      {food.price}円
                    </p>
                  </div>
                  <p className="text-red-300 mt-1 text-sm">
                    {food.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
