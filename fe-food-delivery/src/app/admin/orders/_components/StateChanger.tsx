import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type PropsType = {
  saveChange: () => void;
  statusHandler: (_orderStatus: orderStatusType) => void;
  orderStatus: orderStatusType;
};

export function StateChanger({
  saveChange,
  statusHandler,
  orderStatus,
}: PropsType) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">配達状況を変更</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>配達状況を変更</DialogTitle>
          </DialogHeader>
          <div className="flex my-6 justify-evenly">
            <Button onClick={() => statusHandler(orderStatusType.PENDING)}>
              {orderStatusType.PENDING}
            </Button>
            <Button onClick={() => statusHandler(orderStatusType.DELIVERED)}>
              {orderStatusType.DELIVERED}
            </Button>
            <Button onClick={() => statusHandler(orderStatusType.CANCELLED)}>
              {orderStatusType.CANCELLED}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={saveChange}>
                変更を保存
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
