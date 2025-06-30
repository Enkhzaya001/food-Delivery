import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
type CardItem = {
  img: string;
};

interface CardProp {
  title: string;
  card: CardItem[];
}
export const Card = ({ title, card }: CardProp) => {
  return (
    <div>
      <p className="pb-10 pt-5 text-white text-2xl">{title}</p>
      <div className="grid grid-cols-3 gap-y-5">
        {card.map((el, index) => {
          return (
            <div
              key={index}
              className="w-[400px] h-[342px] bg-white rounded-2xl flex  justity-center items-center p-5 "
            >
              <div className="w-[365px] relative ">
                <Image
                  src={el.img}
                  alt="card"
                  width={365}
                  height={210}
                  className="relative"
                />
                <Button className="absolute  bottom-[110px] right-[18px] w-[50px] h-[50px] rounded-full">
                  <Plus size={30} />
                </Button>
                <div className="flex justify-between items-center w-full">
                  <p className="text-[32px] text-red-500">Finger food</p>
                  <p className="font-semibold text-[24px]">$12.9</p>
                </div>
                <p className="text-gray-500">
                  Fluffy pancakes stacked with fruits, cream, syrup, and
                  powdered sugar.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
