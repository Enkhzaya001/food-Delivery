import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.status(400).send({ message: "User doesn't existed" });
    return;
  } else {
    const hashedPassword = await bcrypt.compare(
      password,
      isEmailExisted.password!
    );
    const tokenPassword = "foodDelivery";
    if (hashedPassword) {
      // {expiresIn: "3s"}
      const token = jwt.sign({ userId: isEmailExisted._id }, tokenPassword);
      response.status(200).send({ message: "Successfully logged in", token });
      return;
    } else {
      response
        .status(401)
        .send({ message: "Email or  password not matching, try again" });
      return;
    }
  }
};
