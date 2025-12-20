"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/UserProvider";

export const NavBar = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  const handleBackLogin = () => {
    logOut();
    router.push("/login"); // client-side redirect
  };

  return (
    <aside className="w-[260px] h-screen bg-yellow-300 border-r p-6 flex flex-col gap-6">
      <div className="flex flex-col h-full p-4 shadow">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <Image src={"/hat.png"} alt="hat" width={40} height={40} />
          <div>
            <div className="text-2xl font-bold text-red-500">NomNom</div>
            <p className="text-gray-500">迅速な配達</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-gray-700">
          <Link href={"/admin/orders"}>
            <Button className="w-full h-[40px]">注文</Button>
          </Link>
          <Link href={"/admin/menu"}>
            <Button className="w-full h-[40px]">フードメニュー</Button>
          </Link>
        </nav>

        {/* Logout button at the bottom */}
        <div className="mt-auto">
          <Button
            onClick={handleBackLogin}
            className="w-full h-[40px] bg-red-500 text-white hover:bg-red-600"
          >
            ログアウト
          </Button>
        </div>
      </div>
    </aside>
  );
};
