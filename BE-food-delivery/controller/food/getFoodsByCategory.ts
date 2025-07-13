import { FoodModel } from "../../model/food.model";
import { Request, Response } from "express";

export const getFoodsByCategory = async (
  _request: Request,
  response: Response
) => {
  const result = await FoodModel.aggregate([
    {
      $lookup: {
        from: "foodcategories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo",
    },

    {
      $group: {
        _id: "$categoryInfo.categoryName",
        foods: {
          $push: {
            _id: "$_id",
            foodName: "$foodName",
            category: "$category",
            image: "$image",
            price: "$price",
            ingredients: "$ingredients",
          },
        },
      },
    },
  ]);
  const groupedByCategory = result.reduce((acc, item) => {
    acc[item._id] = item.foods;
    return acc;
  }, {});
  response.send({ foods: groupedByCategory });
  console.log(groupedByCategory);
};
