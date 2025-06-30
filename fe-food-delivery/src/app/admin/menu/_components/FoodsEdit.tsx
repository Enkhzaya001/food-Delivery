import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";

export function FoodsEdit() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="absolute top-10 right-2 bg-white rounded-full p-1 shadow">
            <Pencil size={14} className="text-red-500" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Dishes info</DialogTitle>
          </DialogHeader>
          <div className=" grid gap-4 py-2">
            <div className="grid gap-1">
              <Label htmlFor="name">Dish name</Label>
              <Input id="name" defaultValue="Brie Crostini Appetizer" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="category">Dish category</Label>
              <div className="w-fit px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                Appetizer
              </div>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="ingredients">Ingredients</Label>
              <textarea
                id="ingredients"
                defaultValue="Fluffy pancakes stacked with fruits."
                className="border rounded px-3 py-2 min-h-[60px]"
              />
            </div>
            <div className="grid gap-1 relative">
              <Label htmlFor="price">Price</Label>
              <Input id="price" defaultValue="$12.99" />
              {/* purple guide box, optional */}
              <div className="absolute top-[55%] left-[60%] text-xs bg-purple-500 text-white px-2 py-0.5 rounded">
                288 × Fill (36)
              </div>
            </div>
            <div className="grid gap-1">
              <Label>Image</Label>
              <div className="relative w-[288px] h-[120px] rounded overflow-hidden">
                <Image
                  src="/your-image.jpg" // Replace with your image path
                  alt="Dish"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="p-2 border border-red-500 text-red-500 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
