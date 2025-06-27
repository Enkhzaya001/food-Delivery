import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodorder.model";

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orders } = req.body;
  console.log(orders);

  await Promise.all(
    orders.map(async (order: Record<string, string>) => {
      await FoodOrderModel.findByIdAndUpdate(
        { _id: order._id },
        { status: order.status }
      );
    })
  );
  res.status(200).send({ message: "Success" });
};
