import { model, Schema } from "mongoose";

export type User = {
  _id: string;
  email: string;
  password: string;
  phoneNumber: Number;
  address: String;
  role?: UserRoleEnum;
  isVerified?: Boolean;

  createdAt: Date;
  updatedAt: Date;
};

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}
const Users = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum),
    required: false,
  },
  isVerified: { type: Boolean, required: false },

  createdAt: { type: Date, defualt: Date.now, immutable: true },
  updatedAt: { type: Date, defualt: Date.now },
});

// Users.index({ email: 1 }, { unique: true });
export const UserModel = model<User>("Users", Users);
