import { Loader } from "lucide-react";

export const OrderCompleteLoading = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-[370px] h-[120px] mx-auto space-y-6 flex justify-center items-center ">
      <Loader className="animate-spin" color="red" size={32} />
    </div>
  );
};
