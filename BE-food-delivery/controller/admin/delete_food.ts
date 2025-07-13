import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";
import { FoodModel } from "../../model/food.model";

export const deleteFood = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id } = req.body;

  if (!_id) {
    res.status(400).json({ error: "Missing food ID" });
    return;
  }

  try {
    const deleted = await FoodModel.findByIdAndDelete(_id);
    if (!deleted) {
      res.status(404).json({ error: "Food not found" });
      return;
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};
