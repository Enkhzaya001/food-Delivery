import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";

export const createCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  try {
    await FoodCategoryModel.create({ categoryName });
    response.send("Successfully created category");
  } catch (err) {
    response.status(401).send("Already exist categoryName");
  }
};
