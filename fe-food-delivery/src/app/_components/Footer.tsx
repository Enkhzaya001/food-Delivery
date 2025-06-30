import Image from "next/image";
export const Footer = () => {
  return (
    <div className="w-full h-[755px] bg-black  flex flex-col items-center pt-10 ">
      <div className="w-full h-[96px] bg-red-500 font-bold text-5xl flex items-center p-4 gap-10 whitespace-nowrap text-white hover:animate-nones">
        <p className="animate-slide"> Fresh fast delivered </p>
        <p className="animate-slide"> Fresh fast delivered </p>
        <p className="animate-slide"> Fresh fast delivered </p>
        <p className="animate-slide"> Fresh fast delivered </p>
        <p className="animate-slide"> Fresh fast delivered </p>
        <p className="animate-slide"> Fresh fast delivered </p>
        <style className="">
          {`
            @keyframes slide {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-200%); }
            }
            .animate-slide {
              animation: slide 5s linear infinite; 
              display: inline-block;
              white-space: nowrap;
            }
          `}
        </style>
      </div>
      <div className="flex justify-center items-center mt-[76px] text-white">
        <div className="w-[1264px] h-[288px] flex p-10">
          <div>
            <Image
              src={"/footerLogo.png"}
              alt="footerLogo"
              width={88}
              height={94}
            />
          </div>
          <div className="flex ml-[300px] w-[588px] justify-between ">
            <div className="h-[148px] flex flex-col justify-between">
              <p className="text-[#71717A] text-[20px] mb-3">NOMNOM</p>
              <p className="gap-10">Home</p>
              <p>Contact us</p>
              <p>Delvery zone</p>
            </div>
            <div className="h-[168px] flex flex-col justify-between ">
              <p className="text-[#71717A] text-[20px] mb-3">Menu</p>
              <p>Appetizes</p>
              <p>Salads</p>
              <p>Lunch favorites</p>
              <p>Main dishes</p>
            </div>
            <div className="h-[168px] flex flex-col justify-between">
              <p className="text-[#71717A] text-[20px] mb-10"> </p>
              <p>Sise dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Fish & Sea foods</p>
            </div>
            <div className="h-[81px]">
              <div className="text-[#71717A] text-[20px] mb-3">FOLLOW US</div>
              <div className="flex gap-4">
                <Image src={"/fb.png"} alt="fb" width={28} height={28} />
                <Image src={"/is.png"} alt="is" width={28} height={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1264px] h-[84px] flex items-center gap-x-[48px] mt-20  border-t-1 border-[#71717A]  text-[#71717A]">
        <p>Copy right 2024 © Nomnom LLC </p>
        <p>Privacy policy</p>
        <p>Terms and condition </p>
        <p>Cookie police</p>
      </div>
    </div>
  );
};
