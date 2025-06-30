import Image from "next/image";
export const Hero = () => {
  return (
    <div>
      <Image
        src={"/BG.png"}
        alt="hero"
        width={1440}
        height={570}
        className="w-full"
      />
    </div>
  );
};
