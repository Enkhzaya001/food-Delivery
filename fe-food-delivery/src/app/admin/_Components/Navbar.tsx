import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const NavBar = () => (
  <aside className="w-[260px] h-screen bg-white border-r p-6 flex flex-col gap-6">
    <div>
      <Image src={"/hat.png"} alt="hat" width={40} height={40}></Image>
      <div>
        <div className="text-2xl font-bold text-red-500">NomNom</div>
        <p className="text-gray-500">Swift delivery</p>
      </div>
    </div>
    <nav className="flex flex-col gap-2 text-gray-700">
      <Link href={"/admin/orders"}>
        <Button className="w-full h-[40px]">Orders</Button>
      </Link>
      <Link href={"/admin/menu"}>
        <Button className="w-full h-[40px]">Food menu</Button>
      </Link>
    </nav>
  </aside>
);
