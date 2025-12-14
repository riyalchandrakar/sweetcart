import useCart from "../context/useCart";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="bg-[#FFF8F1] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-heading text-[#3B1D14] mb-8 flex items-center gap-2">
          🛒 Your Cart
        </h1>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-slate-500 mb-4">
              Your cart is empty 🍬
            </p>
            <Link
              to="/dashboard"
              className="inline-block text-rose-600 font-semibold hover:underline"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="
                    flex gap-4 items-center
                    bg-white rounded-2xl
                    p-4 sm:p-5
                    shadow-sm hover:shadow-md
                    transition
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-heading text-base sm:text-lg text-[#3B1D14]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      ₹{item.price} × {item.qty}
                    </p>

                    <p className="font-semibold mt-2 text-[#3B1D14]">
                      ₹{item.price * item.qty}
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="
                      p-2 rounded-full
                      text-rose-600
                      hover:bg-rose-50
                      transition
                    "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-24">
              <h2 className="text-xl font-heading text-[#3B1D14] mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm text-slate-600 mb-3">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#3B1D14] mb-6">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
<Link
  to="/checkout"
  className="
    block text-center
    w-full py-3 rounded-xl
    bg-rose-600 text-white
    font-semibold
    hover:bg-rose-700
    active:scale-[0.98]
    transition-all
  "
>
  Proceed to Checkout
</Link>


              <Link
                to="/dashboard"
                className="block text-center text-sm text-slate-500 mt-4 hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
