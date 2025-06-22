import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";
import { FoodModel } from "../../model/food.model";

export const addFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, categoryName, category } =
      req.body;
    const isCategoryExisting = await FoodCategoryModel.findOne({
      categoryName,
    });
    await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    // category deer postman deerees getcategory deer irsen id-g oruulna
    res.send({ message: "Successfully added food" });
  } catch (err) {
    res.status(401).send("Hoolnii ner dawhtsahgvi oruulna uu");
  }
  // await FoodModel.create({ foodName, price, image, ingredients, category });
};
