"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InputPropsType } from "../page";
import { motion } from "framer-motion";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const Step2SendEmail = ({
  handleSubmit,
  handleBack,
  handleNext,
  values,
}: InputPropsType) => {
  const [valuesOtp, setValuesOtp] = useState<string>("");

  const checkOtp = async (valuesOtp: string) => {
    try {
      const response = await axios.post("http://localhost:8000/checkOtp", {
        code: valuesOtp,
        email: values.email,
      });
      console.log(response, "wrong code");
      handleNext();
    } catch (err: any) {
      console.log(err);
      alert("Aldaa");
    }
  };
  return (
    <div className="flex justify-between items-center h-screen p-5">
      <div className="flex-1/5  items-center ml-[150px]">
        <motion.div
          key="image"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: -10 }}
          transition={{ duration: 1 }}
        >
          <div className=" w-[350px] h-[288px]">
            <Button
              onClick={handleBack}
              variant={"outline"}
              className="mb-[24px]"
            >
              <ChevronLeft />
            </Button>
            <div className="flex flex-col mb-[20px]">
              <p className="text-[32px]">Please verify Your Email</p>
              <p className="text-gray-500">
                We just sent an email to {values.email} Click the link in the
                email to verify your account.
              </p>
            </div>
            <form>
              <div className="flex flex-col gap-3">
                <div>
                  <InputOTP
                    maxLength={4}
                    value={valuesOtp}
                    onChange={(valuesOtp) => setValuesOtp(valuesOtp)}
                  >
                    <InputOTPGroup className="w-[200px]">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex justify-center">
                  <Button
                    className=" text-gray-500 bg-green-500 mr-[100px] "
                    variant={"outline"}
                  >
                    📩 Resend Email
                  </Button>
                  <Button
                    type="button"
                    className="  text-white text-xl bg-zinc-300 border solid 2xl: border-zinc-400"
                    variant={"outline"}
                    onClick={() => checkOtp(valuesOtp)}
                  >
                    Let's go
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <div className="flex-2/5 h-full">
        <div className="relative h-full w-full">
          <Image src={"/delivery.png"} alt="image" fill></Image>
        </div>
      </div>
    </div>
  );
};
