"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InputPropsType } from "../page";
import { motion } from "framer-motion";
import Link from "next/link";

export const Step3CreateNewPassword = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleBack,
  handleSubmit,
  count,
}: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputSchema = {
    name: "password",
    value: values.password,
    onChange: onChange,
    onBlur: onBlur,
  };

  const ConfirmPasswordInputSchema = {
    name: "confirmPassword",
    value: values.confirmPassword,
    onChange: onChange,
    onBlur: onBlur,
  };
  const isButtonDisabled = !errors.password && values.password;

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
              <p className="text-[32px]">Create a new password</p>
              <p className="text-gray-500">
                Set a new password with a combination of letters and numbers for
                better security.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  id="123"
                  {...passwordInputSchema}
                />
                <div className="text-red-500">{touched && errors.password}</div>
                <Input
                  placeholder="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  {...ConfirmPasswordInputSchema}
                />
                <div className="text-red-500">
                  {touched && errors.confirmPassword}
                </div>
                <div className="flex w-full  items-center justify-start gap-2 ml-[10px]">
                  <Input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-[15px] h-[15px]"
                  />
                  <p>Show password</p>
                </div>
                <Button
                  type="submit"
                  disabled={!isButtonDisabled}
                  className="w-full  text-white text-xl bg-zinc-300 border solid 2xl: border-zinc-400"
                  variant={"outline"}
                >
                  Create password
                </Button>
              </div>
            </form>
            <div className="flex gap-5 mt-[24px] justify-center">
              <p className="text-gray-500">Already have an account? </p>
              <Link href={"./login"}>
                <button className="text-blue-400 cursor-pointer">Log in</button>
              </Link>
            </div>
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
