import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import CartOrderToggle from "./CartOrderTogle";
import { PropsType } from "./foodDetail";
import { OrderDetailCard } from "./OrderDetailCard";
import { OrderComplete } from "./OrderComplete";
import { CartItemType, useCart } from "./CartProvider";
import { CheckOutDialog } from "./CheckOutDialog";
import { LoginDialog } from "./LoginDialog";
import { useAuth } from "./UserProvider";
import { CartEmpty } from "./CartEmpty";
import axios from "axios";

export type OrderType = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  id: string;
  addcount: number;
  index: number;
  increaseQty: (index: number) => void;
  decreaseQty: (index: number) => void;
  deleteOrder: (id: string) => void;
};
export const OrderDetail = () => {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"current" | "history">(
    "current"
  );
  const { cart, setCart, cartCount } = useCart();
  const { address } = useCart();
  const { user } = useAuth();

  const CloseOrderCard = () => {
    setOpenCard(!openCard);
  };

  const storageKey = "FoodCart";
  useEffect(() => {
    if (openCard) {
      const localCart = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setCart(localCart);
    }
  }, [openCard]);

  const updateCart = (newCart: CartItemType[]) => {
    setCart(newCart);
    localStorage.setItem(storageKey, JSON.stringify(newCart));
  };

  const increaseQty = (index: number) => {
    const newCart = [...cart];
    newCart[index].addcount += 1;
    updateCart(newCart);
  };

  const decreaseQty = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].addcount > 1) {
      newCart[index].addcount -= 1;
      updateCart(newCart);
    }
  };

  const deleteOrder = (id: string) => {
    const myOrder = cart.filter((order) => order.id !== id);
    setCart(myOrder);
    localStorage.setItem(storageKey, JSON.stringify(myOrder));
  };

  const checkOutSubmit = async () => {
    const backEndData = cart.map((food) => ({
      food: food.id,
      quantity: food.addcount,
    }));
    const totalPrice = cart.reduce(
      (total, food) => total + food.price * food.addcount,
      0
    );
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      alert("Login hiine uu");
      return;
    }
    try {
      const response = await axios.post(
        "https://food-delivery-be-food-delivery.onrender.com/createOrder",
        {
          user: user?.userId,
          foodOrderItems: backEndData,
          totalPrice,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order placed successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
    remevoCheckOutData();
  };

  const remevoCheckOutData = () => {
    localStorage.removeItem("FoodCart");
    setCart([]);
  };

  return (
    <div className="absolute z-10 ">
      <Sheet open={openCard} onOpenChange={setOpenCard}>
        <SheetTrigger asChild>
          <Button
            type="button"
            onClick={CloseOrderCard}
            className="w-[36px] h-[36px] bg-white rounded-full flex justify-center items-center hover:bg-primary-none"
          >
            <ShoppingCart color="#18181b" />
            {cartCount !== 0 && (
              <div className="w-[20px] h-[20px] absolute z-10 rounded-full bg-red-500 ml-7  mb-8">
                {cartCount}
              </div>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#404040] overflow-y-scroll !w-[400px] !max-w-[400px]">
          <SheetTitle></SheetTitle>
          <div className="flex gap-2 items-center p-2">
            <ShoppingCart color="white" size={25} />
            <p className="text-white text-xl font-semibold">Order detail</p>
          </div>
          <div className="w-full">
            <CartOrderToggle
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          {selectedTab === "current" && (
            <div>
              {cart.length === 0 ? (
                <CartEmpty />
              ) : (
                <div>
                  <div className="  bg-white flex flex-col justify-between rounded-sm m-2">
                    <p className="text-2xl p-2">My cart</p>
                    <div>
                      {cart.map((item, index) => (
                        <div key={index}>
                          <OrderDetailCard
                            key={item.id}
                            foodName={item.foodName}
                            image={item.image}
                            ingredients={item.ingredients}
                            price={item.price}
                            id={item.id}
                            addcount={item.addcount}
                            index={index}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                            deleteOrder={deleteOrder}
                          />
                        </div>
                      ))}
                      <div className=" p-2 w-full ">
                        <h1 className="text-3xl text-gray-500 p-1">
                          Delivery location
                        </h1>
                        <div className="h-[80px] border border-solid border-gray-300 rounded-sm">
                          {/* <input
                            className="w-full p-1 px-2 outline-none"
                            placeholder="Please share your complete address"
                          /> */}
                          <p>
                            <strong>Delivery address:</strong> {address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" bg-white rounded-sm m-2 ">
                    <p className="text-2xl text-gray-500 p-2">Payment info</p>
                    <div>
                      <div>
                        <div className="flex justify-between p-2">
                          <p>Items</p>
                          {cart.reduce(
                            (total, item) => total + item.price * item.addcount,
                            0
                          )}
                          ₮
                        </div>
                        <div className="flex justify-between p-2">
                          <p>Shipping</p>
                          <p>free</p>
                        </div>
                        <div className="w-full  border-b-2 border-dashed"></div>
                        <div className="flex justify-between p-2">
                          <p>Total</p>
                          {cart.reduce(
                            (total, item) => total + item.price * item.addcount,
                            0
                          )}
                          ₮
                        </div>
                      </div>
                      <div className="flex justify-center p-2">
                        {user?.userId ? (
                          <CheckOutDialog
                            CloseOrderCard={CloseOrderCard}
                            checkOutSubmit={checkOutSubmit}
                          />
                        ) : (
                          <LoginDialog />
                        )}
                      </div>
                       
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedTab === "history" && <OrderComplete />}
        </SheetContent>
      </Sheet>
    </div>
  );
};
