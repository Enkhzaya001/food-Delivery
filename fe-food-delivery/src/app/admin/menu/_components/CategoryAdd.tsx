"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export function CategoryAdd() {
  const [inputValue, setInputValue] = useState("");

  const createCategory = async () => {
    const token = window?.localStorage?.getItem("token");
    console.log(token, "token here");

    await axios.post(
      "https://food-delivery-be-food-delivery.onrender.com/createCategory",
      { categoryName: inputValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInputValue("");
  };
  return (
    <Dialog>
      <form onSubmit={createCategory}>
        <DialogTrigger asChild>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white">
            <Plus size={16} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>カテゴリーを追加</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">カテゴリ名</Label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="カテゴリ名を入力してください..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={createCategory}>
                カテゴリーを追加
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
