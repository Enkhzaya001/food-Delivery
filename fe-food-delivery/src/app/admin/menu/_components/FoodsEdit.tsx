"use client";
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
import { FoodProps } from "./MenuSection";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FoodsEdit({
  foodName,
  category,
  image,
  ingredients,
  price,
  _id,
}: FoodProps) {
  const [foodNameVal, setFoodNameVal] = useState(foodName);
  const [foodCategory, setFoodCategory] = useState<string>(category[0] || "");
  const [foodIngredients, setFoodIngredients] = useState(ingredients);
  const [foodPrice, setFoodPrice] = useState(price);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setFoodNameVal(foodNameVal);
  //   setFoodCategory(foodCategory);
  //   setFoodIngredients(foodIngredients);
  //   setFoodPrice(foodPrice);
  // }, [foodNameVal, foodCategory, foodIngredients, foodPrice]);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // const updateFoods = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const token = localStorage.getItem("token");
  //   console.log({
  //     _id,
  //     foodName: foodNameVal,
  //     ingredients: foodIngredients,
  //     price: foodPrice,
  //   });
  //   try {
  //     await axios.put(
  //       "https://food-delivery-be-food-delivery.onrender.com/admin/menu/update",
  //       {
  //         _id,
  //         foodName: foodNameVal,
  //         category: foodCategory,
  //         ingredients: foodIngredients,
  //         price: foodPrice,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (dialogCloseRef.current) dialogCloseRef.current.click();

  //     console.log("Updated successfully");
  //   } catch (err) {
  //     console.error("Update error:", err);
  //   }
  //   setLoading(false);
  // };

  const deleteFoodHandler = async () => {
    const token = localStorage.getItem("token");
    console.log(_id, "id");
    try {
      await axios.delete(
        "https://food-delivery-be-food-delivery.onrender.com/admin/menu/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { _id },
        }
      );
      console.log("Deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute top-10 right-2 bg-white rounded-full p-1 shadow">
          <Pencil size={14} className="text-red-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold"></DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4 py-2">
            <div className="grid gap-1">
              <Label htmlFor="name">料理名</Label>
              <Input
                id="name"
                value={foodNameVal}
                onChange={(e) => setFoodNameVal(e.target.value)}
              />
            </div>
            {/* <div className="grid gap-1">
              <Label htmlFor="category">Dish category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setFoodCategory(e.target.value)}
              />
            </div> */}
            <Select
              defaultValue={foodCategory}
              onValueChange={(value) => setFoodCategory(value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {category.map((cat, i) => {
                  return (
                    <SelectItem key={i} value={cat}>
                      {cat}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="grid gap-1">
              <Label htmlFor="ingredients">材料</Label>
              <textarea
                id="ingredients"
                value={foodIngredients}
                onChange={(e) => setFoodIngredients(e.target.value)}
                className="border rounded px-3 py-2 min-h-[60px]"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="price">価格</Label>
              <Input
                id="price"
                type="number"
                value={foodPrice}
                onChange={(e) => setFoodPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="grid gap-1">
              <Label>Image</Label>
              <div className="relative w-[288px] h-[120px] rounded overflow-hidden">
                <Image src={image} alt="Dish" layout="fill" objectFit="cover" />
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
              onClick={deleteFoodHandler}
              className="p-2 border border-red-500 text-red-500 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <button ref={dialogCloseRef} style={{ display: "none" }} />
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">送信</Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Pencil, Trash2, X } from "lucide-react";
// import Image from "next/image";
// import { FoodProps } from "./MenuSection";
// import axios from "axios";
// import { headers } from "next/headers";
// import { useState } from "react";

// export function FoodsEdit({
//   foodName,
//   category,
//   image,
//   ingredients,
//   price,
//   _id,
// }: FoodProps) {
//   const [foodNameVal, setFoodNameVal] = useState(foodName);
//   const [foodCategory, setFoodCategory] = useState(category);
//   const [foodIngredients, setFoodIngredients] = useState(ingredients);
//   const [foodPrice, setFoodPrice] = useState(price);

//   const updateFoods = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.put(
//         "https://food-delivery-be-food-delivery.onrender.com/admin/menu/update",
//         {
//           foodName: foodNameVal,
//           category: foodCategory,
//           ingredients: foodIngredients,
//           price: foodPrice,
//           _id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("up");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <button className="absolute top-10 right-2 bg-white rounded-full p-1 shadow">
//             <Pencil size={14} className="text-red-500" />
//           </button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[480px]">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold">Dishes info</DialogTitle>
//           </DialogHeader>
//           <div className=" grid gap-4 py-2">
//             <div className="grid gap-1">
//               <Label htmlFor="name">Dish name</Label>
//               <Input
//                 id="name"
//                 value={foodNameVal}
//                 onChange={(e) => setFoodNameVal(e.target.value)}
//                 defaultValue={foodNameVal}
//               />
//             </div>
//             <div className="grid gap-1">
//               <Label htmlFor="category">Dish category</Label>
//               <Input
//                 id="category"
//                 value={foodCategory}
//                 onChange={(e) => setFoodCategory(e.target.value)}
//                 defaultValue={foodCategory}
//               />
//             </div>
//             <div className="grid gap-1">
//               <Label htmlFor="ingredients">Ingredients</Label>
//               <textarea
//                 id="ingredients"
//                 value={foodIngredients}
//                 onChange={(e) => setFoodIngredients(e.target.value)}
//                 defaultValue={foodIngredients}
//                 className="border rounded px-3 py-2 min-h-[60px]"
//               />
//             </div>
//             <div className="grid gap-1 relative">
//               <Label htmlFor="price">Price</Label>
//               <Input
//                 type="number"
//                 defaultValue={price}
//                 value={foodPrice}
//                 onChange={(e) => setFoodPrice(parseFloat(e.target.value))}
//               />
//             </div>
//             <div className="grid gap-1">
//               <Label>Image</Label>
//               <div className="relative w-[288px] h-[120px] rounded overflow-hidden">
//                 <Image src={image} alt="Dish" layout="fill" objectFit="cover" />
//                 <button
//                   type="button"
//                   className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <button
//               type="button"
//               className="p-2 border border-red-500 text-red-500 rounded"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//             <div className="flex gap-2">
//               <DialogClose asChild>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//               <DialogClose>
//                 <Button type="submit" onClick={updateFoods}>
//                   Save changes
//                 </Button>
//               </DialogClose>
//             </div>
//           </div>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// }
