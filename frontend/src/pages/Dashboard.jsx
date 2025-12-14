import { useEffect, useState } from "react";
import API from "../api/api";
import UserSweetCard from "../components/user/UserSweetCard";
import SearchBar from "../components/SearchBar";
import FilterModal from "../components/FilterModal";
import useAuth from "../context/useAuth";
import useCart from "../context/useCart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    maxPrice: "",
  });
  const [openFilter, setOpenFilter] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await API.get("/sweets");
      setSweets(res.data);
    })();
  }, []);

  const filteredSweets = sweets.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filters.category ||
        s.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.maxPrice || s.price <= Number(filters.maxPrice))
    );
  });

  return (
    <div className="bg-[#FFF8F1] min-h-screen">

      {/* 🌸 MINI HERO */}
      <div className="bg-gradient-to-br from-rose-200 via-amber-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl sm:text-3xl font-heading text-[#3B1D14]">
            Hi {user?.name} 👋
          </h1>
          <p className="text-slate-600 mt-1">
            What sweet are you craving today?
          </p>
        </div>
      </div>

      {/* 🔍 SEARCH + FILTER CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onOpenFilter={() => setOpenFilter(true)}
          />
        </div>
      </div>

      {/* 🍬 SWEETS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filteredSweets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-slate-600 mb-2">
              No sweets found 🍬
            </p>
            <p className="text-sm text-slate-400">
              Try changing filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSweets.map((sweet) => (
              <UserSweetCard
                key={sweet._id}
                sweet={sweet}
                onAddToCart={(sweet, qty) => {
                  addToCart(sweet, qty);
                  navigate("/cart");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🎛 FILTER MODAL */}
      {openFilter && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setOpenFilter(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
