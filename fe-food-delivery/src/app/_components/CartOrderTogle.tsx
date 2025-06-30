import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Dispatch } from "react";

type ToggleType = {
  selectedTab: "current" | "history";
  setSelectedTab: React.Dispatch<React.SetStateAction<"current" | "history">>;
};
export default function CartOrderToggle({
  selectedTab,
  setSelectedTab,
}: ToggleType) {
  return (
    <div className="w-full  mx-auto">
      <ToggleGroup
        type="single"
        value={selectedTab}
        onValueChange={(val) => {
          if (val) setSelectedTab(val as "current" | "history");
        }}
        className="flex gap-2 w-full rounded-full bg-white"
      >
        <ToggleGroupItem
          value="current"
          className="px-4 py-2 text-sm flex-1/2 data-[state=on]:bg-red-600 data-[state=on]:text-white bg-[#F3F4F6]"
        >
          Cart
        </ToggleGroupItem>

        <ToggleGroupItem
          value="history"
          className="px-4 py-2 text-sm flex-1/2 data-[state=on]:bg-red-600 data-[state=on]:text-white bg-[#F3F4F6]"
        >
          Order
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
