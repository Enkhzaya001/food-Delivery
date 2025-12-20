import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast, Toaster } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { OrderType } from "./OrderDetail";
import { useCart } from "./CartProvider"; // context-г дуудаж байна

export type PropsType = {
  id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
};

export const FoodDetail = ({
  foodName,
  image,
  ingredients,
  price,
  id,
}: PropsType) => {
  const [addcount, setAddCount] = useState(1);
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useCart();

  const addfood = () => {
    setAddCount((prev) => prev + 1);
  };
  const Minusfood = () => {
    setAddCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const deleteCount = () => {
    setAddCount((prev) => (prev = 1));
  };

  const storageKey = "FoodCart";

  // const saveUnitData = () => {
  //   const existingData = localStorage.getItem(storageKey);
  //   const cartItems: PropsType[] = existingData ? JSON.parse(existingData) : [];

  //   const isFoodExisting = cartItems.find((food) => food.id === id);

  //   if (isFoodExisting) {
  //     const newFoods = cartItems.map((food) => {
  //       if (food.id === id) {
  //         return { ...food, addcount };
  //       } else {
  //         return food;
  //       }
  //     });
  //     localStorage.setItem(storageKey, JSON.stringify(newFoods));
  //   } else {
  //     const newFoods = [
  //       ...cartItems,
  //       { foodName, price, image, id, addcount, ingredients },
  //     ];
  //     localStorage.setItem(storageKey, JSON.stringify(newFoods));
  //     toast.success(" Сагсанд амжиллттай нэмлээ");
  //   }
  // };

  const handleAddToCart = () => {
    console.log(cart, "cart");
    const newItem = { id, foodName, image, ingredients, price, addcount };

    const index = cart.findIndex((item) => item.id === id);
    let updatedCart;

    if (index !== -1) {
      updatedCart = cart.map((item) =>
        item.id === id ? { ...item, addcount } : item
      );
    } else {
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    toast.success(" カートに正常に追加されました。");

    deleteCount();
    setOpen(false);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="absolute  bottom-[110px] right-[18px] w-[50px] h-[50px] rounded-full cursor-pointer"
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="!w-[700px] !max-w-[700px] h-[350px] ">
          <DialogHeader>
            <div className="flex w-full h-full ">
              <div className="w-1/2 h-full">
                <Image
                  src={image}
                  alt="gg"
                  width={300}
                  height={60}
                  className="h-full p-2 rounded-md"
                />
              </div>
              <div className="mt-10 w-1/2 flex flex-col justify-between">
                <div className="gap-4">
                  <DialogClose asChild>
                    <button
                      onClick={deleteCount}
                      className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    >
                      <p className=" p-2 rounded-full hover:none">X</p>
                    </button>
                  </DialogClose>
                  <DialogTitle className="text-red-500 text-3xl">
                    {foodName}
                  </DialogTitle>
                  <DialogDescription>{ingredients}</DialogDescription>
                </div>
                <div>
                  <div className="flex justify-between p-2">
                    <div>
                      <p>合計金額</p>
                      <p className="text-2xl">{price * addcount}円</p>
                    </div>
                    <div className="flex gap-2  items-center justify-between">
                      <Button
                        onClick={Minusfood}
                        className="rounded-full bg-white text-black hover:bg-primary-none border border-gray-300"
                        size="icon"
                      >
                        -
                      </Button>
                      <p>{addcount}</p>
                      <Button
                        onClick={addfood}
                        className="rounded-full bg-white  text-black hover:bg-primary-none border border-gray-300"
                        size="icon"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    type="button"
                    className="w-full rounded-2xl"
                  >
                    カートに追加
                  </Button>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
