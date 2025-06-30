"use client";

import Image from "next/image";
import { useState } from "react";
import { FoodDetail } from "./foodDetail";

export type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type PropsType = {
  foods: {
    [key: string]: FoodProps[];
  };
};

export const CardContainer = ({ foods }: PropsType) => {
  const [foodDetail, setFoodDetail] = useState(false);

  const keys = Object.keys(foods).map((key) => key.trim());
  // const keys = Object.keys(foods);

  return (
    <div className="bg-[#404040] p-10">
      {keys.toSorted().map((category) => (
        <div key={category} className="mb-10">
          <h2 className="pb-6 pt-5 text-white text-2xl">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods[category].slice(0, 6).map((food, index) => (
              <div
                key={index}
                className="w-full max-w-[400px] bg-white rounded-2xl flex justify-center items-center p-5"
              >
                <div className="w-full relative">
                  <Image
                    src={food.image}
                    alt={food.foodName}
                    width={365}
                    height={210}
                    className="w-full h-[210px] object-cover rounded-2xl"
                  />
                  <FoodDetail
                    id={food._id}
                    foodName={food.foodName}
                    image={food.image}
                    ingredients={food.ingredients}
                    price={food.price}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-[24px] text-red-500 font-semibold">
                      {food.foodName}
                    </p>
                    <p className="text-[20px] font-semibold">{food.price}₮</p>
                  </div>
                  <p className="text-gray-500 mt-1 text-sm">
                    {food.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { FoodDetail } from "./foodDetail";

// export type FoodProps = {
//   foodName: string;
//   image: string;
//   ingredients: string;
//   price: number;
//   _id: string;
// };

// type PropsType = {
//   foods: FoodProps;
// };

// export const CardContainer = ({ foods }: PropsType) => {
//   const [foodDetail, setFoodDetail] = useState(false);

//   const keys = Object.keys(foods);
//   return (
//     <div className="bg-[#404040] p-[40px]">
//       {keys.toSorted().map((el) => {
//         return (
//           <div key={el}>
//             <div className="bg-[#404040] relative">
//               <h2 className="pb-10 pt-5 text-white text-2xl">{el}</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 {foods[el].slice(0, 6).map((food, index: number) => {
//                   return (
//                     <div key={index}>
//                       <div className="w-[400px] h-[342px] bg-white rounded-2xl flex justity-center items-center p-5 ">
//                         <div className="w-[365px] relative">
//                           <Image
//                             src={food.image}
//                             alt="card"
//                             width={365}
//                             height={210}
//                             className="relative w-[365px] h-[210px] rounded-2xl"
//                           />
//                           <FoodDetail
//                             id={food._id}
//                             foodName={food.foodName}
//                             image={food.image}
//                             ingredients={food.ingredients}
//                             price={food.price}
//                           />
//                           <div className="flex justify-between items-center w-full">
//                             <p className="text-[32px] text-red-500">
//                               {food.foodName}
//                             </p>
//                             <p className="font-semibold text-[24px]">
//                               {food.price}
//                             </p>
//                           </div>
//                           <p className="text-gray-500">{food.ingredients}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
