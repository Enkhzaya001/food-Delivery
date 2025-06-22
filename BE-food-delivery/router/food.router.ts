import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { addFood } from "../controller/food/add-food";
import { getFoodsByCategory } from "../controller/food/getFoodsByCategory";

export const foodRouter = Router();

foodRouter.post("/addFood", tokenChecker, addFood);
foodRouter.get("/foods", getFoodsByCategory);
