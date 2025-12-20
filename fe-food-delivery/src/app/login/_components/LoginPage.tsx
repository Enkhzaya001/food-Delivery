"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { InputPropsType } from "../page";
import { motion } from "framer-motion";
import Link from "next/link";

export const LoginPage = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleSubmit,
  wrongPassword,
}: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const emailInputSchema = {
    name: "email",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };

  const passwordInputSchema = {
    name: "password",
    value: values.password,
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
          <div className=" w-[380px] h-[288px]">
            <Link href={"./signup"}>
              <Button variant={"outline"} className="mb-[24px]">
                <ChevronLeft />
              </Button>
            </Link>
            <div className="flex flex-col mb-[20px]">
              <p className="text-[32px]">ログイン</p>
              <p className="text-gray-500">
                お気に入りの料理を楽しむにはログインしてください。
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <Input
                  placeholder="メールアドレスを入力してください"
                  {...emailInputSchema}
                />
                <div className="text-red-500">
                  {touched.email && errors.email}
                  <Input
                    placeholder="パスワードを入力してください"
                    type={showPassword ? "text" : "password"}
                    id="123"
                    {...passwordInputSchema}
                  />
                  <div className="text-red-500">
                    {touched && errors.password}
                  </div>
                  {wrongPassword && (
                    <p className="text-red-500">
                      パスワードが間違っています。もう一度試してください。
                    </p>
                  )}
                </div>
                <Link href={"./forgetPassword"}>
                  <button className="flex justify-start underline cursor-pointer">
                    パスワードをお忘れですか？ ?
                  </button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isButtonDisabled}
                  className="w-full  text-white text-xl bg-zinc-300 border solid 2xl: border-zinc-400"
                  variant={"outline"}
                >
                  ログイン
                </Button>
              </div>
            </form>
            <div className="flex gap-5 mt-[24px] justify-center">
              <p className="text-gray-500">
                アカウントをお持ちでない方はこちら ?
              </p>
              <Link href={"./signup"}>
                <button type="submit" className="text-blue-400">
                  サインアップ
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
