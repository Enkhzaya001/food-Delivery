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
import Image from "next/image";

type CheckProps = {
  CloseOrderCard: () => void;
  checkOutSubmit: () => void;
};
export function CheckOutDialog({ CloseOrderCard, checkOutSubmit }: CheckProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          onClick={checkOutSubmit}
          className=" rounded-full w-2/3 bg-red-500 p-5 text-xl"
        >
          Check out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Your order has been successfully placed !
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/illustration.png"}
                alt="illustration"
                width={156}
                height={265}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center items-center">
            <AlertDialogCancel
              onClick={CloseOrderCard}
              className="rounded-full w-[188px]"
            >
              Back to home
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
