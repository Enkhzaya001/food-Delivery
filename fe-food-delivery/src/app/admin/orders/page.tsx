"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/data";
import { OrderType } from "./_components/columns";
import { format } from "date-fns";
import { StateChanger } from "./_components/StateChanger";
enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}
const OrderHomePage = () => {
  const [order, setOrder] = useState<any[]>([]);
  const [selectedOrdersId, setSelectedOrdersId] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderStatusType>(
    orderStatusType.PENDING
  );

  useEffect(() => {
    const fetchData = async () => {
      const token = window?.localStorage?.getItem("token");

      const response: any = await axios.get(
        "https://food-delivery-be-food-delivery.onrender.com/admin/getAllOrders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(response.data.orders);
    };
    fetchData();
  }, []);

  const data: OrderType[] = order.map((el: any, index) => ({
    id: el._id,
    number: index + 1,
    customer: `${el.user?.email}`,
    food: `${el.foodOrderItems?.length || 0} hool`,
    date: format(new Date(el.createdAt), "yyyy-MM-dd"),
    total: el.totalPrice,
    status: el.status,
    address: el.address,
  }));

  const selectHandler = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedOrdersId((prev) => [...prev, id]);
    } else {
      const removed = selectedOrdersId.filter((item) => item != id);
      setSelectedOrdersId(removed);
    }
  };

  const statusHandler = (orderStatus: orderStatusType) => {
    setOrderStatus(orderStatus);
  };

  const saveChange = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Log in hiine uu!");
      return;
    }

    const prepare = selectedOrdersId.map((el) => ({
      _id: el,
      status: orderStatus,
    }));

    try {
      await axios.put(
        "https://food-delivery-be-food-delivery.onrender.com/admin/order/update",
        {
          orders: prepare,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    const updated = order.map((item) => {
      return selectedOrdersId.map((el) => {
        if (item._id === el) {
          return { ...item, status: orderStatus };
        } else {
          return item;
        }
      })[0];
    });
    setOrder(updated);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-black mb-5">Orders</h1>
        <StateChanger
          saveChange={saveChange}
          statusHandler={statusHandler}
          orderStatus={orderStatus}
        />
      </div>

      <DataTable data={data} onCheckedChange={selectHandler} />
    </div>
  );
};

export default OrderHomePage;

// "use client";
// import { DataTable } from "./_components/data";
// import { columns } from "./_components/columns";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [orderData, setOrderData] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const getAdminOrders = async () => {
//       const { data } = await axios.get(
//         "https://food-delivery-be-food-delivery.onrender.com/admin/getAllOrders",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("data: ", data);

//       setOrders(data.orders);
//     };
//     getAdminOrders();
//   }, []);

//   if (!orders.length) {
//     return <p>...loading</p>;
//   }

//   return (
//     <div>
//       <div className="container mx-auto py-10">
//         <DataTable columns={columns} data={orders} />
//       </div>
//     </div>
//   );
// };
// export default Orders;
