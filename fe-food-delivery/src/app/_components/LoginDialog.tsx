import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAuth } from "./UserProvider";
import { redirect } from "next/navigation";

export function LoginDialog() {
  const [selectedTab, setSelectedTab] = useState<"current" | "history">(
    "current"
  );
  const { logOut } = useAuth();

  const handleBackLogin = () => {
    logOut();
    redirect("/login");
  };
  const handleBackSignup = () => {
    logOut();
    redirect("/signup");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" rounded-full w-2/3 bg-red-500 p-5 text-xl">
          Check out
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between ml-20">
            <DialogTitle className="font-semibold text-2xl">
              まずログインしてください。
            </DialogTitle>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="text-xl">
                x
              </Button>
            </DialogClose>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="w-full flex justify-between gap-3">
            <div className="w-full  mx-auto">
              <ToggleGroup
                type="single"
                value={selectedTab}
                className="flex gap-2 w-full  bg-white"
                onValueChange={(val) => {
                  if (val) setSelectedTab(val as "current" | "history");
                }}
              >
                <ToggleGroupItem
                  onClick={handleBackLogin}
                  value="current"
                  className="px-4 py-2 text-sm flex-1/2 data-[state=on]:bg-black data-[state=on]:text-white"
                ></ToggleGroupItem>
                ログイン
                <ToggleGroupItem
                  onClick={handleBackSignup}
                  value="history"
                  className="px-4 py-2 text-sm flex-1/2 data-[state=on]:bg-black data-[state=on]:text-white bg-[#F3F4F6]"
                >
                  サインアップ
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

// export function LoginDialog() {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button className=" rounded-full w-2/3 bg-red-500 p-5 text-xl">
//           Check out
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <div className="flex justify-between items-center">
//             <AlertDialogTitle>You need to log in first </AlertDialogTitle>
//             <button>X</button>
//           </div>
//           <AlertDialogDescription></AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Log in</AlertDialogCancel>
//           <AlertDialogAction>Sign up</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
