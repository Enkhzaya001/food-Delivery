import { Model, model, models, Schema } from "mongoose";

enum foodorderStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type foodOrderItemType = {
  quantity: number;
  food: Schema.Types.ObjectId;
  _id: boolean;
};
type FoodOrderType = {
  user: Schema.Types.ObjectId;
  totalPrice: number;
  foodOrderItems: foodOrderItemType[];
  status: foodorderStatusEnum;
  address: string;
};

const FoodOrderItem = new Schema<foodOrderItemType>(
  {
    quantity: { type: Number, required: true },
    food: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
  },
  { _id: false }
);

const FoodOrder = new Schema<FoodOrderType>(
  {
    user: { type: Schema.ObjectId, required: true, ref: "Users" },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItem], required: true },
    address: { type: String },
    status: {
      type: String,
      enum: Object.values(foodorderStatusEnum),
      default: foodorderStatusEnum.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodOrderModel: Model<FoodOrderType> =
  models["FoodOrders"] || model<FoodOrderType>("FoodOrders", FoodOrder);
