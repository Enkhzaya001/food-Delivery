{
  /* <div className="bg-white p-4 rounded-2xl shadow-md max-w-md mx-auto space-y-6">
  <h2 className="text-lg font-bold">Order history</h2>

  {orderData.map((order) => (
    <div
      key={order._id}
      className="space-y-2 border-b border-dashed border-gray-300 pb-4 last:border-none"
    >
   
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          ${Number(order.totalPrice / 100).toFixed(2)}{" "}
          <span className="text-gray-500 text-sm">#{order._id.slice(-5)}</span>
        </p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            order.status === "PENDING"
              ? "text-red-500 border border-red-300"
              : "text-gray-700 bg-gray-100"
          }`}
        >
          {order.status === "PENDING" ? "Pending" : "Delivered"}
        </span>
      </div>

     
      <div className="text-gray-600 text-sm space-y-1">
        {order.foodOrderItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <p>🍔 {item.food.foodName}</p>
            <span>x {item.quantity}</span>
          </div>
        ))}

     
        <div className="flex items-center gap-1">
          <span>⏰</span>
          <p>{new Date(order.createdAt).toISOString().slice(0, 10)}</p>
        </div>

 
        <div className="flex items-center gap-1">
          <span>📍</span>
          <p className="truncate">{order.address}</p>
        </div>
      </div>
    </div>
  ))}
</div>; */
}

// {
//   isLoading ? (
//     // 💀 Skeleton Loading
//     <div className="space-y-4 animate-pulse">
//       {[1, 2].map((i) => (
//         <div
//           key={i}
//           className="space-y-2 border-b border-dashed border-gray-200 pb-4 last:border-none"
//         >
//           {/* Title row */}
//           <div className="flex justify-between items-center">
//             <div className="h-4 w-28 bg-gray-200 rounded"></div>
//             <div className="h-4 w-14 bg-gray-200 rounded-full"></div>
//           </div>

//           {/* Food items */}
//           <div className="space-y-1">
//             <div className="flex justify-between items-center">
//               <div className="h-3 w-32 bg-gray-200 rounded"></div>
//               <div className="h-3 w-4 bg-gray-200 rounded"></div>
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="h-3 w-28 bg-gray-200 rounded"></div>
//               <div className="h-3 w-4 bg-gray-200 rounded"></div>
//             </div>

//             {/* Date and address */}
//             <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
//             <div className="h-3 w-40 bg-gray-200 rounded"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   ) :
