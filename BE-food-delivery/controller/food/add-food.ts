import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";
import { FoodModel } from "../../model/food.model";

export const addFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    const foodCategory = await FoodCategoryModel.findOne({
      categoryName: category,
    });
    if (!foodCategory) {
      res.status(401).send("Category not found");
      return;
    }

    await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category: foodCategory._id,
    });
    // category deer postman deerees getcategory deer irsen id-g oruulna
    res.send({ message: "Successfully added food" });
  } catch (err) {
    console.log(err);

    res.status(401).send("Hoolnii ner dawhtsahgvi oruulna uu");
  }
  // await FoodModel.create({ foodName, price, image, ingredients, category });
};
