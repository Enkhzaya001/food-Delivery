import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = res.locals;

    const user = await UserModel.findById(userId).select("email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
