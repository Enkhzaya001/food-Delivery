"use client";
import * as Yup from "yup";
import { Step1EnterEmail } from "./_components/Step1_EnterEmail";
import { Step2SendEmail } from "./_components/Step2_SendEmail";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import axios from "axios";
import { Step3CreateNewPassword } from "./_components/Step3_CreateNewPassword";

const componentsArray = [
  Step1EnterEmail,
  Step2SendEmail,
  Step3CreateNewPassword,
];

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
  // )
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
  code: string;
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
export default function forgetPasswordPagev() {
  const [count, setCount] = useState<number>(0);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          "https://food-delivery-be-food-delivery.onrender.com/updatePassword",
          {
            email: values.email,
            password: values.password,
          }
        );
        console.log(response, "amjillttai");
        router.push("/login");
      } catch (err) {
        console.log(err);
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
    handleBack: handleBack,
    handleNext: handleNext,
    handleSubmit: formik.handleSubmit,
  };

  const Stepper = componentsArray[count];
  return (
    <div>
      <Stepper {...inputProps} />
    </div>
  );
}
