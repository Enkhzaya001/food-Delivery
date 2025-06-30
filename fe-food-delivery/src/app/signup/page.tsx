"use client";
import * as Yup from "yup";
import { SignUpStep1 } from "./_Components/SignUpStep1";
import { SignUpStep2 } from "./_Components/SignUpStep2";
import { useState } from "react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../_components/UserProvider";

const componentsArray = [SignUpStep1, SignUpStep2];

const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .required()
    .test(
      "email",
      "Invalid email.Use a format like example@email.com",
      (value) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
      }
    ),
  password: Yup.string().required(),
  // .test(
  //   "password",
  //   "Your password must include an uppercase letter, a lowercase letter, a number, and a special character.",
  //   (value) => {
  //     const passwordRegex =
  //       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  //     return passwordRegex.test(value);
  //   }
  // ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
type TouchedType = {
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};
type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export type InputPropsType = {
  values: FormValues;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  touched: TouchedType;
  handleBack: () => void;
  handleNext: () => void;
  errors: Errors;
  handleSubmit: () => void;
  count: number;
};
export default function SignUpPage() {
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://food-delivery-be-food-delivery.onrender.com/signup",
          {
            email: values.email,
            password: values.password,
          }
        );
        router.push("/login");
      } catch {
        alert("Already exist");
      }
    },
  });

  const handleBack = () => {
    setCount((prev) => prev - 1);
  };
  const handleNext = () => {
    setCount((prev) => prev + 1);
  };
  const inputProps = {
    count: count,
    values: formik.values,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleNext: handleNext,
    handleBack: handleBack,
    handleSubmit: formik.handleSubmit,
  };

  const Stepper = componentsArray[count];
  // if (user?.userId) {
  //   redirect("/");
  // }

  return (
    <div>
      <Stepper {...inputProps} />
    </div>
  );
}
