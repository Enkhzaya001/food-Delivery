import { Request, Response } from "express";
import { UserModel } from "../../model/users.model";
import { OtpModel, OtpPopulated } from "../../model/otp.model";
import nodemailer from "nodemailer";
const crypto = require("crypto");
import bcrypt from "bcrypt";

const sendEmail = async (email: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "enhzaya.0111@gmail.com",
        pass: "emsgjspehcrsnqsw",
      },
    });
    const resetCode = crypto.randomInt(1000, 9999).toString();
    const options = {
      from: "enhzaya.0111@gmail.com",
      to: email,
      subject: "Your otp",
      text: `Таны нууц үг сэргээх код: ${resetCode} (1 минутын хүчинтэй)`,
    };

    await transport.sendMail(options);
    return resetCode;
  } catch (err) {
    throw new Error("Email yvsangui");
  }
};

export const sendOtp = async (request: Request, response: Response) => {
  const { email } = request.body;
  try {
    const isEmailExisted = await UserModel.findOne({ email });
    if (!isEmailExisted) {
      response.status(401).send("User doesn't exist");
      return;
    } else {
      const code = await sendEmail(email);
      await OtpModel.create({ code: code, userId: isEmailExisted._id });
      response.status(200).send("Otp sent");
      return;
    }
  } catch (err) {
    response.status(401).send("User doesn't exist");
  }
};

export const checkOtp = async (request: Request, response: Response) => {
  const { code, email } = request.body;
  try {
    const isOtpExisting = await OtpModel.findOne({
      code: code,
    }).populate<OtpPopulated>("userId");
    if (!isOtpExisting) {
      response.status(400).send("wrong code");
      return;
    }
    if (email === isOtpExisting.userId.email) {
      response.status(200).send({ message: "success", isOtpExisting });
      return;
    }
    response.status(400).send("wrong email or password");
    return;
  } catch (err) {
    response.status(401).send("Invalid code try again");
  }
};

export const updatePassword = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  try {
    if (!isEmailExisted) {
      response.status(401).send({ message: "User not found" });
      return;
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await UserModel.updateOne({ email }, { password: hashedPassword });
      response.status(200).send("Success");
      return;
    }
  } catch (err) {
    response.status(401).send("ajillahgvi bn");
  }
};
