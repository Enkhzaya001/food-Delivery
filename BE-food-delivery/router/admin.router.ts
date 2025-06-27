import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { addFood } from "../controller/food/add-food";
import { getFoodsByCategory } from "../controller/food/getFoodsByCategory";
import { isAdmin } from "../middleware/authorization";
import { getAllOrders } from "../controller/admin/get-all-orders";
import { updateOrderStatus } from "../controller/admin/update-order-status";

export const adminRouter = Router();

adminRouter.get("/admin/getAllOrders", [tokenChecker, isAdmin], getAllOrders);
adminRouter.put("/admin/order/update", [tokenChecker], updateOrderStatus);
