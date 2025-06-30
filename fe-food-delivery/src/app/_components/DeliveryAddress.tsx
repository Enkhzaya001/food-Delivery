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
          Add location
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="!w-[450px] !max-w-[450px] !h-[288px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            <p> Please write your delivery address!</p>
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
                placeholder="Please share your complete address"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={handleSave}> Delivery here</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
