import { Router } from "express";
import { signUp } from "../controller/user/signup";
import { login } from "../controller/user/login";
import { checkOtp, sendOtp, updatePassword } from "../controller/user/forgot";
import { verify } from "../controller/user/verify";
import { tokenChecker } from "../middleware/token-checker";
import { getUser } from "../controller/user/getUser";

export const UserRouter = Router();

UserRouter.post("/signup", signUp);

// UserRouter.get("/user:id", getUserById);

// UserRouter.post("/signUpEmail", signUpEmail);

UserRouter.post("/login", login);
UserRouter.post("/verify", verify);

UserRouter.post("/sendOtp", sendOtp);
UserRouter.post("/checkOtp", checkOtp);
UserRouter.put("/updatePassword", updatePassword);
UserRouter.get("/getUser", tokenChecker, getUser);
