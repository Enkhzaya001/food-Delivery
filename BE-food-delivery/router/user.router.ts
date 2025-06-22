import { Router } from "express";
import { signUp } from "../controller/user/signup";
import { login } from "../controller/user/login";
import { checkOtp, sendOtp, updatePassword } from "../controller/user/forgot";
import { verify } from "../controller/user/verify";

export const UserRouter = Router();

UserRouter.post("/signup", signUp);

// UserRouter.get("/user:id", getUserById);

// UserRouter.post("/signUpEmail", signUpEmail);

UserRouter.post("/login", login);
UserRouter.post("/verify", verify);

UserRouter.post("/sendOtp", sendOtp);
UserRouter.post("/checkOtp", checkOtp);
UserRouter.put("/updatePassword", updatePassword);
