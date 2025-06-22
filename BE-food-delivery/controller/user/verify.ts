import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verify = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.body;
  const tokenPassword = "foodDelivery";
  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructToken: any = jwt.decode(token);
      response.status(200).send({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
    return;
  }
};
