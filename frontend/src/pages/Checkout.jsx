import useCart from "../context/useCart";
import API from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const placeOrder = async () => {
    const toastId = toast.loading("Placing order...");

    try {
      await API.post("/orders/checkout", {
        items: cart,
      });

      toast.success("Order placed successfully 🎉", {
        id: toastId,
      });

      clearCart();
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Order failed",
        { id: toastId }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout 🧾
      </h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between mb-3"
        >
          <span>
            {item.name} × {item.qty}
          </span>
          <span>₹{item.price * item.qty}</span>
        </div>
      ))}

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-rose-600 text-white py-3 rounded-xl hover:bg-rose-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
