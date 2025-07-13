"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryAdd } from "./CategoryAdd";
import { FoodAdd } from "./FoodAdd";
import { FoodsEdit } from "./FoodsEdit";

export type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
  category: string[];
};

export function MenuSection() {
  const [foods, setFoods] = useState<Record<string, FoodProps[]>>({});
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Dishes");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const result = await axios.get(
          "https://food-delivery-be-food-delivery.onrender.com/foods"
        );
        setFoods(result.data.foods as Record<string, FoodProps[]>);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };
    fetchFoods();
  }, []);
  console.log(foods, "hool");

  const allDishes = Object.values(foods).flat();
  const categories = Object.keys(foods);
  const dishesToShow =
    selectedCategory === "All Dishes"
      ? allDishes
      : foods[selectedCategory] || [];

  console.log(dishesToShow, "dish");

  return (
    <div className="p-6 space-y-6">
      {/* Category Buttons */}
      <div>
        <p className="text-2xl font-semibold mb-4">Dishes category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All Dishes")}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === "All Dishes"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            All Dishes ({allDishes.length})
          </button>

          {categories.toSorted().map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full border ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat} ({foods[cat].length})
            </button>
          ))}
          <CategoryAdd />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xl font-semibold">
          {selectedCategory} ({dishesToShow.length})
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedCategory !== "All Dishes" && (
            <FoodAdd categoryName={selectedCategory} />
          )}

          {dishesToShow.map((food, idx) => (
            <Card key={idx} className="relative">
              <img
                src={food.image}
                alt={food.foodName}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm text-red-600 font-semibold">
                    {food.foodName}
                  </h3>
                  <span className="text-sm font-semibold">
                    ${food.price.toFixed()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {food.ingredients}
                </p>
              </CardContent>
              <FoodsEdit
                category={categories}
                foodName={food.foodName}
                _id={food._id}
                image={food.image}
                ingredients={food.ingredients}
                price={food.price}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
