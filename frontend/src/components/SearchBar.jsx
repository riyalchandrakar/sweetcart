import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ search, setSearch, onOpenFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* SEARCH INPUT */}
      <div
        className="
          group flex items-center gap-3
          bg-white/80 backdrop-blur-md
          border border-slate-200
          rounded-2xl px-4
          flex-1
          shadow-sm
          focus-within:shadow-md
          focus-within:border-rose-300
          transition
        "
      >
        <Search
          size={18}
          className="text-slate-400 group-focus-within:text-rose-500 transition"
        />

        <input
          type="text"
          placeholder="Search sweets, like Rasmalai, Kaju Katli..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full bg-transparent
            outline-none py-3
            text-sm sm:text-base
            placeholder:text-slate-400
          "
        />
      </div>

      {/* FILTER BUTTON */}
      <button
        onClick={onOpenFilter}
        className="
          flex items-center justify-center gap-2
          px-5 py-3
          rounded-2xl
          bg-rose-600 text-white
          font-medium
          shadow
          hover:bg-rose-700
          active:scale-[0.97]
          transition-all
        "
      >
        <SlidersHorizontal size={18} />
        <span className="hidden sm:inline">Filters</span>
      </button>
    </div>
  );
};

export default SearchBar;
