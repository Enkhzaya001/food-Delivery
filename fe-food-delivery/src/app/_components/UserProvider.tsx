"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserData = {
  userId: string | null;
  isAdmin: boolean;
};
type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [address, setAddressState] = useState<string>("");

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        token,
      });
      setUser({
        userId: response.data.destructToken.userId,
        isAdmin: response.data.destructToken.isAdmin,
      });
    } catch (err) {
      redirect("/login");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser({ userId: null, isAdmin: false });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokenChecker, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
