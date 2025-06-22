import { model, Schema } from "mongoose";

export type Food = {
  _id: Schema.Types.ObjectId;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: Schema.Types.ObjectId;
  createdAt: Date;
  updated: Date;
};
export const Food = new Schema<Food>({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: { type: Schema.ObjectId, ref: "FoodCategories", required: true },

  createdAt: { type: Date, defualt: Date.now, immutable: true },
  updated: { type: Date, defualt: Date.now },
});

Food.index({ foodName: 1 }, { unique: true });
export const FoodModel = model<Food>("Foods", Food);
