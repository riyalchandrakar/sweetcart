import { useEffect, useState } from "react";
import API from "../api/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F1]">
        <p className="text-slate-500 text-lg">Loading your orders…</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F1] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading text-[#3B1D14]">
            📦 My Orders
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Track and review your past purchases
          </p>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-500 text-lg mb-2">
              You haven’t placed any orders yet 🍬
            </p>
            <p className="text-sm text-slate-400">
              Once you place an order, it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (
              <div
                key={order._id}
                className="
                  bg-white rounded-3xl
                  shadow-sm hover:shadow-md
                  transition
                  overflow-hidden
                "
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 bg-[#FFF4EC]">
                  <div className="text-sm text-slate-600">
                    <span className="font-medium text-[#3B1D14]">
                      Order #{order._id.slice(-6)}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* ITEMS */}
                <div className="px-5 py-4 divide-y">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-4"
                    >
                      {/* IMAGE */}
                      <img
                        src={item.sweet?.image}
                        alt={item.sweet?.name}
                        className="
                          w-14 h-14 sm:w-16 sm:h-16
                          rounded-xl object-cover
                          bg-slate-100
                        "
                      />

                      {/* INFO */}
                      <div className="flex-1">
                        <p className="font-medium text-[#3B1D14] text-sm sm:text-base">
                          {item.sweet?.name}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500">
                          ₹{item.price} × {item.qty}
                        </p>
                      </div>

                      {/* PRICE */}
                      <p className="font-semibold text-sm sm:text-base text-[#3B1D14]">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center px-5 py-4 border-t bg-[#FFFDFB]">
                  <span className="text-sm text-slate-500">
                    Total Amount
                  </span>
                  <span className="text-lg font-semibold text-[#3B1D14]">
                    ₹{order.totalAmount}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
