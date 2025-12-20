import Image from "next/image";
export const CartEmpty = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-[370px]  mx-auto space-y-6">
      <div className="flex flex-col justify-center">
        <Image
          src={"/hat.png"}
          alt="hat"
          width={61}
          height={50}
          className="m-auto"
        ></Image>
        <p className="text-xl flex justify-center text-muted-foreground">
          カートは空です。
        </p>
        <p className="text-sm m-auto items-center p-4 text-center">
          お腹が空きましたか？🍔
          お気に入りの料理をカートに追加して、食欲を満たしましょう！
        </p>
      </div>
    </div>
  );
};
