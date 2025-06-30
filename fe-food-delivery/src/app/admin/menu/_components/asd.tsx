// bi category add bolon addfoods hesgee hiisen bgaa . bi edgeer orson buh kodoo ywuulii deerh kodiig minii kode deer zaswarlaad minii kodoos hereggvi zuiliiih hasaad  bicheed ogno uu?  "use client";
// import React from "react";
// import { Plus, Pencil } from "lucide-react";
// import { Card, CardAction, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CategoryAdd } from "./CategoryAdd";
// import { CardContainer } from "@/app/_components/CardContainer";
// import { FoodAdd } from "./FoodAdd";

// export type Food = {
//   foodName: string;
//   image: string;
//   ingredients: string;
//   price: number;
//   _id: string;
// };

// export type CategoryType = {
//   _id: string;
//   categoryName: string;
// };
// export function MenuSection() {
//   const [category, setCategory] = useState<CategoryType[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = window?.localStorage?.getItem("token");

//       const response: any = await axios.get(
//         "https://food-delivery-be-food-delivery.onrender.com/categories",
//         {
//           headers: {
//             Authorization: Bearer ${token},
//           },
//         }
//       );
//       setCategory(response.data.categories);
//     };
//     fetchData();
//   }, []);

//   const [foods, setFoods] = useState<Record<string, Food[]>>({});

//   useEffect(() => {
//     const datafetch = async () => {
//       try {
//         const result = await axios.get("https://food-delivery-be-food-delivery.onrender.com/foods");
//         setFoods(result.data.foods as Record<string, Food[]>);
//       } catch (error) {
//         console.error("Failed to fetch foods:", error);
//       }
//     };

//     datafetch();
//   }, []);

//   const keys = Object.keys(foods);
//   return (
//     <div className="p-6 space-y-6">
//       <div className=" gap-2">
//         <p className="text-2xl font-semibold">Dishes category</p>
//         <div className="flex">
//           {keys.map((item) => {
//             return (
//               <button>
//                 <span>
//                   {item} ({foods[item].length})
//                 </span>
//               </button>
//             );
//           })}
//           <CategoryAdd />
//         </div>
//       </div>
//       {keys.sort().map((item) => {
//         return (
//           <div key={item} className="border-2 border-blue-300 rounded-md p-4">
//             <h2 className="text-xl font-semibold mb-4">
//               {item} {foods[item].length}
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               <FoodAdd categoryName={item} />
//               {foods[item].map((food, idx) => (
//                 <Card key={idx} className="relative">
//                   <img
//                     src={food.image}
//                     alt={food.foodName}
//                     className="w-full h-40 object-cover rounded-t-md"
//                   />
//                   <CardContent className="p-4">
//                     <h3 className="text-sm text-red-600 font-semibold mb-1">
//                       {food.foodName}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {food.ingredients}
//                     </p>
//                     <span className="font-semibold">
//                       ${food.price.toFixed()}
//                     </span>
//                   </CardContent>
//                   <button className="absolute top-10 right-2 bg-white rounded-full p-1 shadow">
//                     <Pencil size={14} className="text-red-500" />
//                   </button>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//       ;
//     </div>
//   );
// }
