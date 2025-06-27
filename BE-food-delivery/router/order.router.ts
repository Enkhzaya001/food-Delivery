import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { CreateOrder } from "../controller/order/create-order";
import { getOrderByUserId } from "../controller/order/get-order-by-userId";

export const OrderRouter = Router();

OrderRouter.post("/createOrder", tokenChecker, CreateOrder);
OrderRouter.get("/getOrders", tokenChecker, getOrderByUserId);
