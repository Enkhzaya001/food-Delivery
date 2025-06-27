import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodorder.model";

export const getOrderByUserId = async (_req: Request, res: Response) => {
  const { userId } = res.locals;
  try {
    const allOrderByUserId = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    });
    res.status(200).send({ order: allOrderByUserId });
  } catch (err) {
    res.status(400).send({ message: "Cannot get Orders" });
    return;
  }
};
