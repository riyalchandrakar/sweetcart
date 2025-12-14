import { X } from "lucide-react";

const FilterModal = ({ filters, setFilters, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className="
          relative w-full sm:max-w-md
          bg-white
          rounded-t-3xl sm:rounded-3xl
          p-6
          shadow-2xl
          animate-slideUp
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading text-[#3B1D14]">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Mithai, Chocolate, Dry Fruit"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="
              w-full rounded-xl border
              px-4 py-3
              text-sm
              focus:outline-none
              focus:ring-2 focus:ring-rose-400
            "
          />
        </div>

        {/* MAX PRICE */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ₹
            </span>
            <input
              type="number"
              placeholder="500"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="
                w-full rounded-xl border
                pl-8 pr-4 py-3
                text-sm
                focus:outline-none
                focus:ring-2 focus:ring-rose-400
              "
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              setFilters({ category: "", maxPrice: "" })
            }
            className="
              flex-1 py-3 rounded-xl
              border border-slate-200
              text-slate-600 font-medium
              hover:bg-slate-50
              transition
            "
          >
            Reset
          </button>

          <button
            onClick={onClose}
            className="
              flex-1 py-3 rounded-xl
              bg-rose-600 text-white
              font-semibold
              hover:bg-rose-700
              active:scale-[0.98]
              transition-all
            "
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
