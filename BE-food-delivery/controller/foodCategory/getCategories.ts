import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";

export const getCategories = async (_request: Request, response: Response) => {
  try {
    const allCategories = await FoodCategoryModel.find();
    response.send({ categories: allCategories });
  } catch (err) {
    response.status(400).send({ message: "Error in database not connection" });
  }
};
