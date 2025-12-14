import { Pencil, Trash2 } from "lucide-react";

const AdminSweetCard = ({ sweet, onEdit, onDelete }) => {
  const outOfStock = sweet.quantity === 0;

  return (
    <div
      className="
        group bg-white rounded-2xl
        shadow-sm hover:shadow-lg
        transition-all duration-300
        overflow-hidden relative
      "
    >
      {/* IMAGE */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={sweet.image}
          alt={sweet.name}
          className="
            w-full h-full object-cover
            group-hover:scale-105
            transition-transform duration-500
          "
        />

        {/* PRICE */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-[#3B1D14]">
          ₹{sweet.price}
        </span>

        {/* STOCK */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
            outOfStock
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {outOfStock ? "Out of stock" : "In stock"}
        </span>

        {/* ACTIONS (HOVER) */}
        <div
          className="
            absolute inset-0
            bg-black/30
            opacity-0 group-hover:opacity-100
            transition
            flex items-center justify-center gap-4
          "
        >
          <button
            onClick={onEdit}
            className="
              bg-white p-3 rounded-full
              text-amber-600
              hover:bg-amber-50
              transition
            "
            title="Edit Sweet"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={onDelete}
            className="
              bg-white p-3 rounded-full
              text-red-600
              hover:bg-red-50
              transition
            "
            title="Delete Sweet"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-heading text-lg text-[#3B1D14] truncate">
          {sweet.name}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {sweet.category}
        </p>

        <div className="mt-3 text-sm text-slate-600">
          Stock:{" "}
          <span className="font-semibold text-[#3B1D14]">
            {sweet.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSweetCard;
