"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { LoginPage } from "./_components/LoginPage";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "../_components/UserProvider";
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
});
type TouchedType = {
  email?: boolean;
  password?: boolean;
};
type FormValues = {
  email: string;
  password: string;
};
type Errors = {
  email?: string;
  password?: string;
};
export type InputPropsType = {
  values: FormValues;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  touched: TouchedType;
  errors: Errors;
  handleSubmit: () => void;
  wrongPassword: boolean;
};
export default function Login() {
  const { user, tokenChecker } = useAuth();
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/login", {
          email: values.email,
          password: values.password,
        });
        localStorage.setItem("token", response.data.token);
        await tokenChecker(response.data.token);
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
  });

  const inputProps = {
    wrongPassword: wrongPassword,
    values: formik.values,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
  };
  if (user?.userId) {
    if (user?.isAdmin) {
      redirect("/admin/orders");
    } else {
      redirect("/");
    }
  }

  return (
    <div>
      <LoginPage {...inputProps} />
    </div>
  );
}
