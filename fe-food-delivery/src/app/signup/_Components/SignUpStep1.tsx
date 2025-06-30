"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { InputPropsType } from "../page";
import { motion } from "framer-motion";
import Link from "next/link";
import axios from "axios";

export const SignUpStep1 = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleNext,
  handleSubmit,
}: InputPropsType) => {
  const emailInputSchema = {
    name: "email",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.email && values.email;

  return (
    <div className="flex justify-between items-center h-screen p-5">
      <div className="flex-1/5 justify-center items-center ml-[150px]">
        <motion.div
          key="image"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 10 }}
          transition={{ duration: 1 }}
        >
          <div className=" w-[350px] h-[288px]">
            <Button variant={"outline"} className="mb-[24px] cursor-pointer">
              <ChevronLeft />
            </Button>
            <div className="flex flex-col mb-[20px]">
              <p className="text-[32px]">Create your account</p>
              <p className="text-gray-500">
                Sign up to explore your favorite dishes.
              </p>
            </div>
            <form>
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Enter your email address"
                  {...emailInputSchema}
                />
                <div className="text-red-500">
                  {touched.email && errors.email}
                </div>
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isButtonDisabled}
                  className="w-full  text-white text-xl bg-zinc-300 border solid 2xl: border-zinc-400"
                  variant={"outline"}
                >
                  Let's go
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
