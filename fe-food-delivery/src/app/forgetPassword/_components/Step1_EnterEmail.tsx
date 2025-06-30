"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { InputPropsType } from "../page";
import { motion } from "framer-motion";
import Link from "next/link";

export const Step1EnterEmail = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleBack,
  handleNext,
  handleSubmit,
}: InputPropsType) => {
  const emailInputSchema = {
    name: "email",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const isButtonDisabled = !errors.email && values.email;

  const emailHandleNext = async () => {
    setLoading(true);
    console.log("hi");
    try {
      const response = await axios.post("http://localhost:8000/sendOtp", {
        email: values.email,
      });
      console.log(response);
      if (response.data === "Otp sent") {
        handleNext();
        setLoading(false);
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data);
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
            <Link href={"./login"}>
              <Button variant={"outline"} className="mb-[24px]">
                <ChevronLeft />
              </Button>
            </Link>
            <div className="flex flex-col mb-[20px]">
              <p className="text-[32px]">Reset your password</p>
              <p className="text-gray-500">
                Enter your email to receive a password reset link.
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
                {loading && (
                  <div className="flex justify-center items-center w-[350px] h-[30px]">
                    <Loading />
                  </div>
                )}
                <Button
                  type="button"
                  onClick={emailHandleNext}
                  disabled={!isButtonDisabled}
                  className="w-full  text-white text-xl bg-zinc-300 border solid 2xl: border-zinc-400"
                  variant={"outline"}
                >
                  Send link
                </Button>
              </div>
            </form>
            <div className="flex gap-5 mt-[24px] justify-center">
              <p className="text-gray-500">Don't have an account ?</p>
              <Link href={"./signup"}>
                <button type="submit" className="text-blue-400">
                  Sign up
                </button>
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

const Loading = () => {
  return (
    <div className="animate-spin text-[#55ca38]">
      <Loader size={32} />
    </div>
  );
};
