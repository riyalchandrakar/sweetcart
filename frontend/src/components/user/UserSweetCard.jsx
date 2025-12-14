import { useState } from "react";

const UserSweetCard = ({ sweet, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const outOfStock = sweet.quantity === 0;

  return (
    <div
      className="
        group bg-white rounded-3xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={sweet.image}
          alt={sweet.name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-500
          "
        />

        {/* PRICE BADGE */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-[#3B1D14]">
          ₹{sweet.price}
        </span>

        {/* STOCK BADGE */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
            outOfStock
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {outOfStock ? "Out of stock" : "In stock"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-heading text-lg text-[#3B1D14] mb-1 truncate">
          {sweet.name}
        </h3>

        <p className="text-sm text-slate-500 mb-3">
          {sweet.category}
        </p>

        {/* QTY SELECTOR */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="
                w-8 h-8 rounded-full
                border border-slate-300
                text-lg font-semibold
                hover:bg-slate-100
                transition
              "
            >
              −
            </button>

            <span className="w-6 text-center font-medium">
              {qty}
            </span>

            <button
              onClick={() =>
                setQty((q) =>
                  Math.min(sweet.quantity, q + 1)
                )
              }
              className="
                w-8 h-8 rounded-full
                border border-slate-300
                text-lg font-semibold
                hover:bg-slate-100
                transition
              "
            >
              +
            </button>
          </div>

          <span className="text-xs text-slate-400">
            {sweet.quantity} left
          </span>
        </div>

        {/* CTA */}
        <button
          disabled={outOfStock}
          onClick={() => onAddToCart(sweet, qty)}
          className={`
            w-full py-3 rounded-xl
            text-sm font-semibold
            transition-all
            ${
              outOfStock
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]"
            }
          `}
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default UserSweetCard;
