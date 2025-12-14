import { useState } from "react";
import API from "../api/api";
import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const SweetModal = ({ initialData, onClose, onSuccess }) => {
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || "",
    image: initialData?.image || "",
  }));

  const isEdit = Boolean(initialData);

  const submit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading(
      isEdit ? "Updating sweet..." : "Adding sweet..."
    );

    try {
      if (isEdit) {
        await API.put(`/sweets/${initialData._id}`, form);
        toast.success("Sweet updated successfully 🍬", {
          id: toastId,
        });
      } else {
        await API.post("/sweets", form);
        toast.success("Sweet added successfully 🍭", {
          id: toastId,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong",
        { id: toastId }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <form
        onSubmit={submit}
        className="
          relative w-full max-w-md
          bg-white rounded-3xl
          p-6 sm:p-8
          shadow-2xl
          space-y-4
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-heading text-[#3B1D14]">
            {isEdit ? "Update Sweet" : "Add New Sweet"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* IMAGE UPLOAD */}
        <ImageUpload
          value={form.image}
          onChange={(url) =>
            setForm({ ...form, image: url })
          }
        />

        {/* NAME */}
        <input
          placeholder="Sweet Name"
          className="
            w-full rounded-xl border
            px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-rose-400
          "
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        {/* CATEGORY */}
        <input
          placeholder="Category (Mithai, Dry Fruit...)"
          className="
            w-full rounded-xl border
            px-4 py-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-rose-400
          "
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        />

        {/* PRICE + QTY */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Price (₹)"
            className="
              w-full rounded-xl border
              px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-rose-400
            "
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            className="
              w-full rounded-xl border
              px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-rose-400
            "
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            required
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="
              flex-1 py-3 rounded-xl
              bg-rose-600 text-white
              font-semibold
              hover:bg-rose-700
              active:scale-[0.98]
              transition-all
            "
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 py-3 rounded-xl
              border border-slate-200
              text-slate-600 font-medium
              hover:bg-slate-50
              transition
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SweetModal;
