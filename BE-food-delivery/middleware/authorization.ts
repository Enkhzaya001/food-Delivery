import { NextFunction, Request, Response } from "express";
import { UserModel, UserRoleEnum } from "../model/users.model";

export const isAdmin = async (
  req: Request,
  res: Response,
  nextt: NextFunction
) => {
  const { userId } = res.locals;
  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) {
      res.status(404).send({ message: "User does not exist" });
      return;
    }
    if (user.role === UserRoleEnum.ADMIN) {
      nextt();
      return;
    }

    res.status(401).send({ message: "Unauthorized user" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Something went wrong" });
    return;
  }
};
