import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import bcrypt from "bcrypt";

export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    const isEmailExisted = await UserModel.findOne({ email });

    if (!isEmailExisted) {
      const hashedPassword = await bcrypt.hashSync(password, 10);
      await UserModel.create({ email, password: hashedPassword });
      response.status(200).send({ message: "Successfully registered" });
      return;
    } else {
      response.status(401).send({ message: "User already existed" });
    }
  } catch (err) {
    console.log(err);
    response.status(401).send({ message: "User already existed" });
  }
};
