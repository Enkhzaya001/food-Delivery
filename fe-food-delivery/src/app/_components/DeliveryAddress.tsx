import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";
import { useState } from "react";

export function DeliveryAddress() {
  const { setAddress } = useCart();
  const [inputValue, setInputValue] = useState("");
  const handleSave = () => {
    setAddress(inputValue); // localStorage + context дотор хадгална
    setInputValue("");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="flex justify-center items-start">
        <Button
          variant="outline"
          className="outline-none !border-none text-gray-500"
        >
          配達先を入力してください
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!w-[450px] !max-w-[450px] !h-[288px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            <p>配達先の住所をご入力ください !</p>
            <AlertDialogCancel
              asChild
              className="outline-none bg-none border-none hover:none"
            >
              <button className="w-[30px] h-[30px] rounded-full bg-[#f3f4f6] text-gray-400">
                X
              </button>
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription asChild className="my-auto">
            <div className="h-[80px] border border-solid border-gray-300 rounded-sm">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-1 px-2 outline-none"
                placeholder="例: 東京都渋谷区神南1-19-11"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={handleSave}> 配達先を保存</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
