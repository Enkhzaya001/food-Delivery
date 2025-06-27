import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodorder.model";

export const CreateOrder = async (req: Request, res: Response) => {
  const { totalPrice, foodOrderItems, address } = req.body;
  const { userId } = res.locals;
  try {
    await FoodOrderModel.create({
      user: userId,
      totalPrice,
      foodOrderItems,
      address,
    });
    res.status(200).send({ message: "Successfully created order" });
    return;
  } catch (err) {
    res.status(400).send({ message: "Order uusgehed aldaa garlaa" });
    return;
  }
};
