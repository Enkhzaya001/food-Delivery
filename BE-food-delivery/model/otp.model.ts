import { model, Schema } from "mongoose";
import { User } from "./users.model";

export type Otp = {
  userId: Schema.Types.ObjectId;
  code: string;
  createdAt: Date;
};
export type OtpPopulated = {
  userId: User;
};
const Otp = new Schema<Otp>({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },

  createdAt: { type: Date, default: Date.now, expires: 120 },
});
export const OtpModel = model<Otp>("Otp", Otp);
