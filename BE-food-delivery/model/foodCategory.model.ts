import { model, Schema } from "mongoose";

export type FoodCategory = {
  categoryName: String;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategory = new Schema<FoodCategory>({
  categoryName: { type: String, required: true },

  createdAt: { type: Date, defualt: Date.now, immutable: true },
  updatedAt: { type: Date, defualt: Date.now },
});

FoodCategory.index({ categoryName: 1 }, { unique: true });
export const FoodCategoryModel = model<FoodCategory>(
  "FoodCategories",
  FoodCategory
);
