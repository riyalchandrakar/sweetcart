import { useEffect, useState } from "react";
import API from "../api/api";
import AdminSweetCard from "../components/admin/AdminSweetCard";
import SweetModal from "../components/SweetModal";
import useAuth from "../context/useAuth";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const Admin = () => {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🔄 FETCH SWEETS */
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  /* 🔒 AUTH GUARD */
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-600 font-semibold">
        Access Denied 🚫
      </div>
    );
  }

  /* 📊 STATS LOGIC */
  const totalProducts = sweets.length;
  const totalStock = sweets.reduce((sum, s) => sum + s.quantity, 0);
  const outOfStock = sweets.filter((s) => s.quantity === 0).length;
  const categoriesCount = new Set(sweets.map((s) => s.category)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E8] via-[#FFF8F1] to-white">

      {/* 🔥 HEADER */}
      <div className="border-b bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading text-[#3B1D14]">
              Admin Control Panel 👑
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage sweets, pricing & inventory
            </p>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="
              inline-flex items-center gap-2
              bg-rose-600 text-white
              px-6 py-3 rounded-xl
              font-semibold
              shadow hover:bg-rose-700
              active:scale-[0.97]
              transition
            "
          >
            <Plus size={18} />
            Add Sweet
          </button>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Products" value={totalProducts} />
      <StatCard label="Total Stock" value={totalStock} />
      <StatCard
         label="Out of Stock"
         value={outOfStock}
         danger={outOfStock > 0}
      />
      <StatCard label="Categories" value={categoriesCount} />

      </div>

      {/* 🧁 PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-center text-slate-500 py-20">
            Loading inventory…
          </p>
        ) : sweets.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-slate-500 mb-2">
              No sweets added yet 🍬
            </p>
            <p className="text-sm text-slate-400">
              Use “Add Sweet” to create inventory
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sweets.map((sweet) => (
              <AdminSweetCard
                key={sweet._id}
                sweet={sweet}
                onEdit={() => {
                  setEditing(sweet);
                  setOpen(true);
                }}
                onDelete={async () => {
                  const ok = window.confirm(
                    `Delete "${sweet.name}"?`
                  );
                  if (!ok) return;

                  const toastId = toast.loading("Deleting sweet...");
                  try {
                    await API.delete(`/sweets/${sweet._id}`);
                    setSweets((prev) =>
                      prev.filter((s) => s._id !== sweet._id)
                    );
                    toast.success("Sweet deleted", { id: toastId });
                  } catch {
                    toast.error("Delete failed", { id: toastId });
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🪟 MODAL */}
      {open && (
        <SweetModal
          initialData={editing}
          onClose={() => setOpen(false)}
          onSuccess={fetchSweets}
        />
      )}
    </div>
  );
};

/* 🔢 STAT CARD COMPONENT */
const StatCard = ({ label, value, danger }) => (
  <div
    className={`
      bg-white rounded-2xl p-6 shadow-sm border
      ${danger ? "border-red-200" : "border-slate-100"}
    `}
  >
    <p className="text-sm text-slate-500 mb-1">{label}</p>

    <p
      className={`text-3xl font-bold ${
        danger ? "text-red-600" : "text-[#3B1D14]"
      }`}
    >
      {value}
    </p>

    {/* OPTIONAL UX MESSAGE */}
    {label === "Out of Stock" && value === 0 && (
      <p className="text-xs text-green-600 mt-1">
        All items are in stock 🎉
      </p>
    )}
  </div>
);

export default Admin;
