"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ShoppingCart, MapPin, ChevronRight } from "lucide-react";
import { useAuth } from "./UserProvider";
import { useState } from "react";
import { AccountSection } from "./AccountSection";
import { OrderDetail } from "./OrderDetail";
import { DeliveryAddress } from "./DeliveryAddress";

export const Header = () => {
  const { user } = useAuth();
  const [userAccount, setUserAccount] = useState<boolean>(false);

  const handleUser = () => {
    setUserAccount(!userAccount);
  };

  return (
    <div className="flex justify-between items-center bg-black h-[68px] p-10">
      <div>
        <Image src={"/logo.png"} alt="logo" width={146} height={44} />
      </div>
      <div className="flex gap-12 p-5">
        <div className="flex justify-between items-center w-[350px] h-[36px] bg-white rounded-full p-2 gap-2">
          <MapPin color="red" size={26} />
          <p className="text-red-500 whitespace-nowrap">配達先住所:</p>
          <DeliveryAddress />
          <ChevronRight size={26} />
        </div>
        <div>
          <OrderDetail />
        </div>
        <Button
          onClick={handleUser}
          className="w-[36px] h-[36px] bg-red-500 rounded-full flex justify-center items-center hover:bg-primary-none "
        >
          <User className="relative " size={20} />
          {userAccount && <AccountSection />}
        </Button>
      </div>
    </div>
  );
};
