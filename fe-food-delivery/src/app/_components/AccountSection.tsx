"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "./UserProvider";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
// type User = {
//   userId: string;
// };

// type AccountSectionProps = {
//   user: User | null;
// };

export const AccountSection = () => {
  const { user, logOut } = useAuth();
  return user?.userId ? <AccountLoggedUser /> : <AccountSignUpUser />;
};

const AccountSignUpUser = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleBackLogin = () => {
    logOut();
    redirect("/login");
  };
  const handleBackSignup = () => {
    logOut();
    redirect("/signup");
  };

  return (
    <div className=" mt-40 mr-[45px] h-[100px]  absolute z-1 p-2 rounded-2xl bg-gradient-to-br from-red-500 to-black  ">
      <div className="text-center text-[15px] mt-1 p-2">
        Don't have an account ?
      </div>
      <div className="flex justify-center gap-2 p-2">
        <Button
          onClick={handleBackSignup}
          className="w-2/5 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition"
        >
          Sign up
        </Button>
        <Button
          onClick={handleBackLogin}
          className="w-2/5 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition"
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

const AccountLoggedUser = () => {
  const router = useRouter();
  const { logOut } = useAuth();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "https://food-delivery-be-food-delivery.onrender.com/getProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmail(res.data.email);
        console.log(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className=" mt-40 mr-[45px] h-[100px]  absolute z-1 p-2 rounded-2xl bg-gradient-to-br from-red-500 to-black  ">
      <div className="text-center text-[15px] mt-1 p-2">
        {email && (
          <p className="mt-2 text-gray-700 text-sm">Logged in as: {email}</p>
        )}
      </div>
      <div className="flex justify-center gap-2 p-2">
        <Button
          onClick={logOut}
          className=" py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition"
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
