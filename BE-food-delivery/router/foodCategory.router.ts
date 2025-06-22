import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { createCategory } from "../controller/foodCategory/createCategory";
import { getCategories } from "../controller/foodCategory/getCategories";

export const foodCategoryRouter = Router();

foodCategoryRouter.post("/createCategory", tokenChecker, createCategory);
foodCategoryRouter.get("/categories", getCategories);
