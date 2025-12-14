import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔄 Loading toast
    const toastId = toast.loading("Creating your account...");

    try {
      await API.post("/auth/register", form);

      toast.success(
        "Account created 🎉 Please login to continue.",
        { id: toastId }
      );

      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-rose-100 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">

        {/* HEADER */}
        <h2 className="text-2xl sm:text-3xl font-heading text-center text-[#3B1D14] mb-2">
          Create Account 🍬
        </h2>
        <p className="text-center text-slate-500 mb-6 text-sm sm:text-base">
          Join us and enjoy your favourite sweets
        </p>

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-4">

          <div>
            <label className="text-sm text-slate-600">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all ${
              loading
                ? "bg-slate-400"
                : "bg-rose-600 hover:bg-rose-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-rose-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
