import { model, Schema } from "mongoose";

enum foodorderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type foodOrderItemType = {
  food: Schema.Types.ObjectId;
  quantity: Number;
};
type FoodOrderType = {
  user: Schema.Types.ObjectId;
  foodOrderItem: foodOrderItemType;
  stastus: foodorderStatusEnum;
  createdAt: Date;
  updated: Date;
};
const FoodOrder = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: "Users" },
  totalPrice: { type: Number, required: true },
  foodOrderItem: {
    food: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
    quantity: { type: Number, require: true },
  },
  status: {
    type: String,
    enum: Object.values(foodorderStatusEnum),
    required: true,
  },
  createdAt: { type: Date, defualt: Date.now, immutable: true },
  updated: { type: Date, defualt: Date.now },
});

const FoodOrderModel = model<FoodOrderType>("FoodOrders", FoodOrder);
